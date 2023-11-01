import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";
import jwt, { JwtPayload } from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ error: "Token de autenticação não fornecido" });
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("A variável de ambiente SECRET_KEY não está definida.");
      }
      const token = authHeader.split("Bearer ")[1];

      if (token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
          ) as JwtPayload;

          const email = decoded.email;

          const data = req.body;

          const response = await faunaClient.query<any>(
            query.Create(query.Collection("aula"), {
              data: {
                email,
                ...data,
              },
            })
          );

          await faunaClient.query(
            query.Create(query.Collection("leads"), {
              data: {
                campoAula: response.data.campoAula,
                // Adicione outros campos da coleção "leads" conforme necessário
              },
            })
          );

          res.status(200).json({
            Aula01: {
              email,
              id: response.ref.id,
              ...data,
            },
          });
        } catch (error) {
          console.log(error);
          res.status(401).json({ error: "Token de autenticação inválido" });
        }
      } else {
        res.status(401).json({ error: "Token de autenticação não fornecido" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao cadastrar a pergunta." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
