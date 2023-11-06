import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

async function createUniqueUrlIndexIfNotExists() {
  try {
    const indexExists = await faunaClient.query(
      query.Exists(query.Index("unique_url"))
    );

    if (!indexExists) {
      await faunaClient.query(
        query.CreateIndex({
          name: "unique_url",
          source: query.Collection("curso"),
          terms: [{ field: ["data", "url"] }],
          unique: true,
        })
      );
      console.log('Índice "unique_url" criado com sucesso.');
    }
  } catch (error) {
    console.error('Erro ao criar o índice "unique_url":', error);
  }
}

createUniqueUrlIndexIfNotExists();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { url } = req.query;

      if (typeof url === "string" && url !== "") {
        const user = await faunaClient.query<any>(
          query.Get(query.Match(query.Index("unique_url"), url))
        );

        if (user && user.data) {
          res.status(200).json({
            message: "Usuário encontrado com sucesso!",
            data: user.data,
          });
        } else {
          res.status(404).json({ error: "Usuário não encontrado" });
        }
      } else {
        res.status(400).json({ error: "URL inválida" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
