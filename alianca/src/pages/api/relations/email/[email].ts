import { Client, Collection, CreateIndex, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

async function createEmailIndexIfNotExists() {
  try {
    const indexExists = await faunaClient.query(
      query.Exists(query.Index("unique_email"))
    );

    if (!indexExists) {
      await faunaClient.query(
        CreateIndex({
          name: "unique_email",
          unique: true,
          serialized: true,
          source: Collection("leads"),
          terms: [
            {
              field: ["data", "email"],
            },
          ],
        })
      );
    }
  } catch (error) {
    console.error("Erro ao criar o índice:", error);
  }
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      if (req.query.email) {
        const userEmail = req.query.email as string;

        await createEmailIndexIfNotExists();

        const userResponse = await faunaClient.query<{
          data: ILeadResponse;
        }>(query.Get(query.Match(query.Index("unique_email"), userEmail)));

        if (userResponse) {
          res.status(200).json({ data: userResponse.data });
        } else {
          res.status(404).json({ error: "Usuário não encontrado" });
        }
      } else {
        const response = await faunaClient.query<{
          data: ILeadResponse[];
        }>(
          query.Map(
            query.Paginate(query.Documents(query.Collection("leads"))),
            query.Lambda("X", query.Get(query.Var("X")))
          )
        );

        const leads = response.data.map((item) => ({
          id: item.ref.id,
          ...item.data,
        }));

        res.status(200).json({ data: leads });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao recuperar os usuários." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
