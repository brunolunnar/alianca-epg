// pages/api/getAula1.js

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
      // Aqui você pode consultar o FaunaDB para obter os dados da aula 1.
      // Substitua com sua própria lógica de consulta.

      const response = await faunaClient.query<any>(
        // Exemplo: Consulta o FaunaDB para obter os dados da aula 1
        query.Get(query.Ref(query.Collection("leads"), "documento_id_aqui"))
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar os dados da aula." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
