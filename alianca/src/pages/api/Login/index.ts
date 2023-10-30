import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";
import jwt from "jsonwebtoken";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

async function getUserByEmail(email: string) {
  try {
    const result = await faunaClient.query<any>(
      query.Get(query.Match(query.Index("unique_email"), email))
    );
    

    const id = result.ref.id;

    return {
      id,
      ...result.data,
    };
  } catch (error) {
    console.error("Erro ao obter usuário por email:", error);
    return null; 
  }
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      const user = await getUserByEmail(email);
     
      if (!user) {
        res.status(400).json({ error: "Email não cadastrado" });
        return;
      }
   
      const isAdmin = user.isAdmin || false;


      if (process.env.SECRET_KEY) {
        const token = jwt.sign(
          {
            id: user.id,
            email,
            name: user.name,
            isAdmin,
  
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "8h",
          }
        );
      

        res.status(200).json({ token });
      } else {
        res.status(500).json({ error: "A chave secreta não está definida" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao fazer o login." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
