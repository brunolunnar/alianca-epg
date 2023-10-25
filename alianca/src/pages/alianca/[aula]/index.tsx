import { NextApiRequest, NextApiResponse } from "next";
import { Client, query } from "faunadb";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

faunaClient.query(
  query.CreateIndex({
    name: "unique_email",
    source: query.Collection("leads"),
    terms: [{ field: ["data", "email"] }],
    unique: true,
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { emailDoUser } = req.query; // Captura o emailDoUser dos parâmetros da URL

  if (req.method === "POST") {
    try {
      const data: IRegisterData = req.body;

      // Verifique se o emailDoUser corresponde ao usuário logado ou tem permissão para fazer essa ação

      const emailExists = await faunaClient.query<boolean>(
        query.Exists(query.Match(query.Index("unique_email"), data.email))
      );

      if (emailExists) {
        res.status(400).json({ error: "Email já cadastrado" });
        return;
      }

      // Agora você pode usar o emailDoUser para criar a pergunta no contexto desse usuário
      // Exemplo: crie uma pergunta associada a esse usuário com base no email

      const response = await faunaClient.query<any>(
        query.Create(query.Collection("perguntas"), {
          data: {
            emailDoUser: emailDoUser,
            // Outros campos da pergunta
          },
        })
      );

      res.status(200).json({
        message: "Pergunta cadastrada com sucesso!",
        data: { id: response.ref.id, ...data },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao cadastrar a pergunta." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
