import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ error: "Token de autenticação não fornecido" });
      }

      const token = authHeader.split("Bearer ")[1];
if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}
      if (token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
          ) as JwtPayload;

          const emailDoUser = decoded.email;
          const data = req.body;

          const response = await faunaClient.query<any>(
            query.Create(query.Collection("aula1"), {
              coll:'aula1',
              data: {
                emailDoUser,
                ...data,
                coll:"aula1"
              },
            })
          );

          res.status(201).json({
            Aula01: {
              coll:"aula1",
              emailDoUser,
              id: response.ref.id,
              ...data,
            },
          });
        } catch (error) {
          console.log(error);
          res.status(401).json({ error: "Token de autenticação inválido" });
        }
      } else {
        res.status(401).json({ error: "Token de autenticação não fornecido" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao cadastrar na coleção aula1." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
