import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});


async function createIndexIfNotExists() {
  try {
    const indexExists = await faunaClient.query(
      query.Exists(query.Index("index_email"))
    );

    if (!indexExists) {
      await faunaClient.query(
        query.CreateIndex({
          name: "index_email",
          source: query.Collection("aula"),
          terms: [{ field: ["data", "email"] }],
          unique: false,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { email } = req.query;

      if (typeof email !== "string") {
        return res
          .status(400)
          .json({ error: "O parâmetro 'email' é inválido." });
      }

      await createIndexIfNotExists();

      const response = await faunaClient.query<any>(
        query.Map(
          query.Paginate(query.Match(query.Index("index_email"), email)),
          query.Lambda("X", query.Get(query.Var("X")))
        )
      );

      const data = response.data.map((item: any) => {
        // Remove o campo "email" de cada objeto
        const { email, ...rest } = item.data;
        return rest;
      });

      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar os dados." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
