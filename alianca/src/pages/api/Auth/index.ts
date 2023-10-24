import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

// Crie uma interface que descreve o formato do token, incluindo o campo "name"
interface CustomJwtPayload extends JwtPayload {
  name: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        res.status(401).json({ error: "Token de autenticação ausente" });
        return;
      }

      if (!process.env.SECRET_KEY) {
        res.status(500).json({ error: "A chave secreta não está definida" });
        return;
      }

      jwt.verify(token, process.env.SECRET_KEY as Secret, (err, decoded) => {
        if (err) {
          res.status(401).json({ error: "Token inválido ou expirado" });
        } else {
          // Utilize a interface CustomJwtPayload para tipar os dados do token
          const user = decoded as CustomJwtPayload;
          res.status(200).json({ message: "Autenticado com sucesso", user });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro na autenticação" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
