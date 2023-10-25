import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";
import jwt from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, name } = req.body;

      const emailExists = await faunaClient.query<boolean>(
        query.Exists(query.Match(query.Index("unique_email"), email))
      );

      if (!emailExists) {
        res.status(400).json({ error: "Email não cadastrado" });
        return;
      }

      if (process.env.SECRET_KEY) {
        const token = jwt.sign({ email, name }, process.env.SECRET_KEY, {
          expiresIn: "8h",
        });

        res.status(200).json({ token });
      } else {
        res.status(500).json({ error: "A chave secreta não está definida" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao fazer o login." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
