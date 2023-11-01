import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const userId = req.query.userId as string;
      const aulaId = req.query.aulaId as string;

   
      const userAula = await faunaClient.query<any>(
        query.Let(
          {
            userRef: query.Ref(query.Collection("leads"), userId),
            aulas: query.Select(["data", "aulas"], query.Get(query.Var("userRef"))),
            aula: query.Filter(
              query.Var("aulas"),
              query.Lambda("a", query.Equals(query.Select("id", query.Var("a")), aulaId))
            ),
          },
          query.If(
            query.IsEmpty(query.Var("aula")),
            null,
            query.Select(0, query.Var("aula"))
          )
        )
      );

      if (userAula) {
        res.status(200).json(userAula);
      } else {
        res.status(404).json({ error: "Aula não encontrada." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar a aula." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
