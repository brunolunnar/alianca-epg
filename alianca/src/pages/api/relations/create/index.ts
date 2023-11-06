import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}
const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

interface ICursoResponse {
  ref: {
    id: string;
  };
  data: {
    url: string;
    title: string;
    "pergunta 01": string;
    "pergunta 02": string;
    video: string;
    clear: boolean;
  };
}

export async function createUniqueEmailIndex() {
  try {
    await faunaClient.query(
      query.CreateIndex({
        name: "unique_email",
        source: query.Collection("leads"),
        terms: [{ field: ["data", "email"] }],
        unique: true,
      })
    );
    console.log('Índice "unique_email" criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar o índice "unique_email":', error);
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Crie o índice de email único se ele não existir
      await createUniqueEmailIndex();

      const data = req.body;

      if (
        data.email === "felipe@lunnar.team" ||
        data.email === "rian@lunnar.team" ||
        data.email === "teste@mail"
      ) {
        data.isAdmin = true;
      } else {
        data.isAdmin = false;
      }

      const emailExists = await faunaClient.query<boolean>(
        query.Exists(query.Match(query.Index("unique_email"), data.email))
      );

      if (emailExists) {
        res.status(400).json({ error: "Email já cadastrado" });
        return;
      }

      const cursosResponse = await faunaClient.query<{
        data: ICursoResponse[];
      }>(
        query.Map(
          query.Paginate(query.Documents(query.Collection("curso"))),
          query.Lambda("X", query.Get(query.Var("X")))
        )
      );

      const aulas = cursosResponse.data.map((curso) => ({
        id: curso.ref.id,
        title: curso.data.title,
        url: curso.data.url,
        clear: false,
      }));

      data.aulas = aulas;

      const response = await faunaClient.query<any>(
        query.Create(query.Collection("leads"), {
          data: data,
        })
      );
      console.log(response);
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
