import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const response = await faunaClient.query<any>(
        query.Get(query.Ref(query.Collection("leads"), id))
      );

      const usuario = {
        id: response.ref.id,
        ...response.data,
      };

      res.status(200).json({ data: usuario });
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao recuperar o usuário por ID." });
    }
  } else if (req.method === "PATCH") {
  
    try {
      const { id } = req.query;
      const newData = req.body; 

      const response = await faunaClient.query<any>(
        query.Update(query.Ref(query.Collection("leads"), id), {
          data: newData,
        })
      );

      const usuario = {
        id: response.ref.id,
        ...response.data,
      };

      res.status(200).json({ data: usuario });
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário por ID." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
