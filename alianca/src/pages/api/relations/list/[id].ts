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
      if (req.query.id) {
        const userId = req.query.id as string;
        const userResponse = await faunaClient.query<{
          data: ILeadResponse;
        }>(query.Get(query.Ref(query.Collection("leads"), userId)));

        if (userResponse) {
          res.status(200).json({ data: userResponse.data });
        } else {
          res.status(404).json({ error: "Usuário não encontrado" });
        }
      } else {
        const response = await faunaClient.query<{
          data: ILeadResponse[];
        }>(
          query.Map(
            query.Paginate(query.Documents(query.Collection("leads"))),
            query.Lambda("X", query.Get(query.Var("X")))
          )
        );

        const leads = response.data.map((item) => ({
          id: item.ref.id,
          ...item.data,
        }));

        res.status(200).json({ data: leads });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao recuperar os usuários." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
