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


      const user = await faunaClient.query<any>(
        query.Get(query.Ref(query.Collection("leads"), userId))
      );

      if (user.ref) {
       
        const userAulas = user.data.aulas;

        res.status(200).json({ aulas: userAulas });
      } else {
        res.status(404).json({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar as aulas do usuário." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
