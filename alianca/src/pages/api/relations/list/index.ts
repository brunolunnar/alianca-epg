import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({
  secret: process.env.SECRET_KEY,
});

interface ILeadResponse {
    ref: {
      id: string;
    };
    data: {
      id: string; 
      name: string; 
      email: string; 
      whatsapp: string; 
      segmento: string; 
      colaboradores: string; 
      faturamento: string; 
      isAdmin: boolean; 
      aulas: {
        id: string; 
        title: string; 
        clear: boolean; 
      }[];
    };
  }
  


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
        const response = await faunaClient.query<{
          data: ILeadResponse[];
        }>(
          query.Map(
            query.Paginate(query.Documents(query.Collection("leads"))),
            query.Lambda("X", query.Get(query.Var("X")))
          )
        );
  
        const leads = response.data.map((item) => ({
          leadId: item.ref.id,
          ...item.data,
        }));
  
      
     
      res.status(200).json({ data: leads });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocorreu um erro ao recuperar os usuários." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
