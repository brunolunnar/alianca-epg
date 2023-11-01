import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
        
      const data = req.body;
      const response = await faunaClient.query<any>(
        query.Create(query.Collection("curso"), {
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
