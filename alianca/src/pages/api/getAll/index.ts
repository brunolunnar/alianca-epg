import { Client, query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";

interface Aula {
  id: string;
  emailDoUser: string;
  "Por que valeu a pena essa aula": string;
  "Quais decisões você toma": string;
}

interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
  segmento: string;
  colaboradores: string;
  faturamento: string;
  aulas: Record<string, Aula>;
  data?: any;
  organizedData?: Record<string, LeadData>;
}

if (!process.env.SECRET_KEY) {
  throw new Error("A variável de ambiente SECRET_KEY não está definida.");
}

const faunaClient = new Client({ secret: process.env.SECRET_KEY });

async function getAllDocuments(collectionName: string) {
  const response = await faunaClient.query<any>(
    query.Map(
      query.Paginate(query.Documents(query.Collection(collectionName))),
      query.Lambda("X", query.Get(query.Var("X")))
    )
  );
  return response.data;
}
function mergeLeadDataWithAulas(leadData: LeadData[], aulaData: any[]) {
  const organizedData: Record<string, LeadData> = {};

  leadData.forEach((lead) => {
    const email = lead.data.email;
    if (!organizedData[email]) {
      organizedData[email] = {
        name: lead.data.name,
        email: lead.data.email,
        whatsapp: lead.data.whatsapp,
        segmento: lead.data.segmento,
        colaboradores: lead.data.colaboradores,
        faturamento: lead.data.faturamento,
        aulas: {},
      };
    }
    aulaData.forEach((aula) => {
   
      if (aula.data.emailDoUser === email) {
        const aulaKey = `${aula.ref}`;
    

        organizedData[email].aulas[aulaKey] = {
          id: aula.id,
          emailDoUser: aula.data.emailDoUser,
          "Por que valeu a pena essa aula":
            aula.data["Por que valeu a pena essa aula"],
          "Quais decisões você toma": aula.data["Quais decisões você toma"],
        };
      }
    });
  });

  return organizedData;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const leads = await getAllDocuments("leads");
    const aula1Data = await getAllDocuments("aula1");
    const aula2Data = await getAllDocuments("aula2");
    const aula3Data = await getAllDocuments("aula3");

    const leadsWithAulas = mergeLeadDataWithAulas(leads, [
      ...aula1Data,
      ...aula2Data,
      ...aula3Data,
    ]);

    // Transforme o objeto em um array de objetos
    const modifiedData = Object.values(leadsWithAulas);

    res.status(200).json({ data: modifiedData });
  } catch (error) {
    console.error("Ocorreu um erro ao recuperar e combinar os dados:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao recuperar os dados combinados." });
  }
};