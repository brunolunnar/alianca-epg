import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { LeadsContainer } from "@/styles/pages/Leads/Lead";
import { SlArrowRight } from "react-icons/sl";
import { useEffect, useState } from "react";
import Link from "next/link";
import jwt, { JwtPayload } from "jsonwebtoken";

globalStyle();

interface Lead {
  email: any;
  data: any;
  id: string;
  name: string;
  segmento: string;
  colaboradores: number;
  faturamento: string;
}
interface DecodedToken {
  email: string;
  name: string;
  isAdmin: boolean;
}
export const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as DecodedToken;
        console.log(decodedToken)
        if (decodedToken.isAdmin === true) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      return; // Se o usuário não é um administrador, não renderize o componente
    }

    fetch("/api/getAll")
      .then((response) => response.json())
      .then((data) => {
        const leadData = data.data;
        setLeads(leadData);
        setFilteredLeads(leadData);
      })
      .catch((error) => console.error("Erro ao buscar os leads:", error));
  }, [isAdmin]); // Adicione isAdmin como dependência

  const handleSearch = (searchText: string) => {
    const filtered = leads.filter((lead) =>
      lead.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredLeads(filtered);
  };

  if (!isAdmin) {
    return (
      <LeadsContainer>
        <p>Você não tem permissão para acessar esta página.</p>
      </LeadsContainer>
    );
  }

  return (
    <LeadsContainer>
      <div className="box">
        <Image className="logo" src={Logo} alt="Logotipo da empresa" />
        <h2>
          Lista de <b>Leads</b> que se cadastraram no Despertar Governante!
        </h2>
      </div>
      <input
        type="text"
        placeholder="Faça uma busca!"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        <div className="title">
          <p>Nome</p>
          <p>Serviços</p>
          <p>Funcionarios</p>
          <p>Faturamento</p>
        </div>
        {filteredLeads.map((lead) => (
          <li key={lead.email}>
            <p>{lead.name}</p>
            <p>{lead.segmento}</p>
            <p>{lead.colaboradores}</p>
            <div className="fature-box">
              <p>{lead.faturamento}</p>
              <Link href={`/leads/${lead.email}`}>
                <button>
                  <SlArrowRight />
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </LeadsContainer>
  );
};
export default Leads;
