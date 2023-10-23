import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import Image from 'next/image';
import { LeadIdContainer } from "@/styles/pages/Leads/LeadId";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

globalStyle();

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  segmento: string;
  colaboradores: number;
  faturamento: string;
}

export const LeadsId = () => {
  const router = useRouter();
  const { id } = router.query;
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/List/${id}`)
        .then((response) => response.json())
        .then((data: { data: Lead }) => {
          setLead(data.data);
        })
        .catch((error) => console.error("Erro ao buscar os detalhes do lead:", error));
    }
  }, [id]);

  if (!lead) {
    return <p>Carregando...</p>;
  }

  return (
    <LeadIdContainer>
      <Image className="logo" src={Logo} alt="logotipo da empresa" />
      <section>
        <h1>Nome do lead: {lead.name}</h1>
        <p>Email: {lead.email}</p>
        <p>Whatsapp: {lead.whatsapp}</p>
        <p>Segmento: {lead.segmento}</p>
        <p>Colaboradores : {lead.colaboradores}</p>
        <p>Faturamento : {lead.faturamento}</p>
        <div>
            perguntas e respostas
        </div>
      </section>
    </LeadIdContainer>
  );
};

export default LeadsId;
