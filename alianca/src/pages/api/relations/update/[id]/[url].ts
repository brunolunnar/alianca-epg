import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const url: string = req.query.url as string;

      const updateUserResponse = await faunaClient.query<any>(
        query.Update(
          query.Ref(query.Collection("leads"), id), 
          {
            data: {
              aulas: query.Map(
                query.Select(
                  ["data", "aulas"],
                  query.Get(query.Ref(query.Collection("leads"), id))
                ),
                query.Lambda(
                  ["aula"],
                  query.If(
                    query.Equals(
                      query.Select(["url"], query.Var("aula")),
                      url
                    ),
                    query.Merge(query.Var("aula"), { clear: true }),
                    query.Var("aula")
                  )
                )
              ),
            },
          }
        )
      );

      if (updateUserResponse.ref) {
        res.status(200).json({ message: "Aula atualizada com sucesso." });
      } else {
        res.status(404).json({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao atualizar a aula." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
