
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
      const response = await faunaClient.query<{
        data: ILeadResponse[];
      }>(
        query.Map(
          query.Paginate(query.Documents(query.Collection("curso"))),
          query.Lambda("X", query.Get(query.Var("X")))
        )
      );

      const cursos = response.data.map((item) => ({
        id: item.ref.id,
        ...item.data,
      }));

      res.status(200).json({ data: cursos });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao recuperar os usuários." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}