import { NextApiRequest, NextApiResponse } from "next";

interface CombinedData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  segmento: string;
  colaboradores: string;
  faturamento: string;
  Aula01?: Aula;
  Aula02?: Aula;
  Aula03?: Aula;
}
interface User {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    segmento: string;
    colaboradores: string;
    faturamento: string;
  }
  
  interface Aula {
    id: string;
    emailDoUser: string;
    "Por que valeu a pena essa aula?": string;
    "Quais decisões você toma?": string;
  }
  
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Obtenha os dados dos usuários
    const usersResponse = await fetch("api/List");
    const usersData: User[] = await usersResponse.json();

    // Obtenha os dados das aulas
    const aula01Response = await fetch("api/aula1");
    console.log(aula01Response)
    const aula02Response = await fetch("api/aula2");
    console.log(aula02Response)
    const aula03Response = await fetch("api/aula3");
    console.log(aula03Response)
    const aula01Data: Aula[] = await aula01Response.json();
    const aula02Data: Aula[] = await aula02Response.json();
    const aula03Data: Aula[] = await aula03Response.json();

    // Combine os dados dos usuários com os dados das aulas
    const combinedData: CombinedData[] = usersData.map((user) => {
      const aula01 = aula01Data.find((aula) => aula.emailDoUser === user.email);
      const aula02 = aula02Data.find((aula) => aula.emailDoUser === user.email);
      const aula03 = aula03Data.find((aula) => aula.emailDoUser === user.email);

      return {
        ...user,
        Aula01: aula01,
        Aula02: aula02,
        Aula03: aula03,
      };
    });

    res.status(200).json({ data: combinedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao recuperar os dados." });
  }
};
