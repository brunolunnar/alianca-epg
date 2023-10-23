import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import Image from 'next/image'
import { LeadIdContainer } from "@/styles/pages/Leads/LeadId";

globalStyle();
export const LeadsId = () => {
  return (
    <LeadIdContainer>
      <Image className="logo" src={Logo} alt="logotipo da empresa" />
      <section>
        <h1>Nome do lead: Lead</h1>
        <p>Email: mail</p>
        <p>Whatsapp: whatsapp</p>
        <p>Segmento: segmento</p>
        <p>Colaboradores : Colaboradores</p>
        <p>Faturamento : Fatruramento </p>
        <div>
            perguntas e respostas
        </div>
      </section>
    </LeadIdContainer>
  );
};

export default LeadsId;
