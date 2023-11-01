import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { LeadIdContainer } from "@/styles/pages/Leads/LeadId";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

globalStyle();

interface Lead {
  aulas: Record<string, any>;
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  segmento: string;
  colaboradores: string;
  faturamento: string;
}

export const LeadsId = () => {
  const router = useRouter();
  const email = router.query;
  const id = email.id;

  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (id) {
  
      fetch(`/api/getAll/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setLead(data.data);
        })
        .catch((error) =>
          console.error("Erro ao buscar os detalhes do lead:", error)
        );
    }
        
  }, [email]);

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
        <p>Colaboradores: {lead.colaboradores}</p>
        <p>Faturamento: {lead.faturamento}</p>
        <div>
          <h2>perguntas e respostas</h2>
          {Object.keys(lead.aulas).map((aulaKey, um) => (
            <div className="questions-box" key={aulaKey}>
              <h3 className="title-question">Aula 0{um + 1}</h3>
              <span>Por que valeu a pena essa aula:</span>
              <p>{lead.aulas[aulaKey]["Por que valeu a pena essa aula"]}</p>
              <span>Quais decisões você toma:</span>
              <p>{lead.aulas[aulaKey]["Quais decisões você toma"]}</p>
            </div>
          ))}
        </div>
      </section>
    </LeadIdContainer>
  );
};

export default LeadsId;
