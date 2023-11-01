import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

faunaClient.query(
  query.CreateIndex({
    name: "unique_email",
    source: query.Collection("leads"),
    terms: [{ field: ["data", "email"] }],
    unique: true,
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      
      const data = req.body;

      if (
        data.email === "felipe@lunnar.team" ||
        data.email === "rian@lunnar.team" ||
        data.email === "teste@mail"
      ) {
        data.isAdmin = true;
      } else {
        data.isAdmin = false;
      }

      const emailExists = await faunaClient.query<boolean>(
        query.Exists(query.Match(query.Index("unique_email"), data.email))
      );

      if (emailExists) {
        res.status(400).json({ error: "Email já cadastrado" });
        return;
      }

      const response = await faunaClient.query<any>(
        query.Create(query.Collection("leads"), {
          data: data,
        })
      );

      res.status(200).json({
        message: "Cadastro realizado com sucesso!",
        data: { id: response.ref.id, ...data },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao cadastrar os dados." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
