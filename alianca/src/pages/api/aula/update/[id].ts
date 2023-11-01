import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";

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

   
      const response = await faunaClient.query<any>(
        query.Update(query.Ref(query.Collection("aula"), id), {
          data: {
            curso: true,
          },
        })
      );

      const usuario = {
        id: response.ref.id,
        ...response.data,
      };

      res.status(200).json({ data: usuario });
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao atualizar o campo 'aula' para true." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
