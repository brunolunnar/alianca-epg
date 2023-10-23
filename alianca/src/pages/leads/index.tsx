import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { LeadsContainer } from "@/styles/pages/Leads/Lead";
import { SlArrowRight } from "react-icons/sl";

globalStyle();

export const Leads = () => {
  return (
    <LeadsContainer>
      <div className="box">
        <Image className="logo" src={Logo} alt="Logotipo da empresa"></Image>
        <h2>
          Lista de <b>Leads</b> que se cadastraram no Despertar Governante!
        </h2>
      </div>
      <input type="text" placeholder="Faça uma busca!" />
      <ul>
        <div className="title">
          <p>Nome</p>
          <p>Serviços</p>
          <p>Funcionarios</p>
          <p>Faturamento </p>
        </div>
        <li>
          <p>Nome</p>
          <p>Serviços</p>
          <p>6</p>
          <div className="fature-box">
            <p>10 a 30 mil </p>
            <button>
              {" "}
              <SlArrowRight />
            </button>
          </div>
        </li>
        <li>
          <p>Nome</p>
          <p>Serviços</p>
          <p>6</p>
          <div className="fature-box">
            <p>10 a 30 mil </p>
            <button>
              {" "}
              <SlArrowRight />
            </button>
          </div>
        </li>
        <li>
          <p>Nome</p>
          <p>Serviços</p>
          <p>6</p>
          <div className="fature-box">
            <p>10 a 30 mil </p>
            <button>
              {" "}
              <SlArrowRight />
            </button>
          </div>
        </li>
        <li>
          <p>Nome</p>
          <p>Serviços</p>
          <p>6</p>
          <div className="fature-box">
            <p>10 a 30 mil </p>
            <button>
              {" "}
              <SlArrowRight />
            </button>
          </div>
        </li>
        <li>
          <p>Nome</p>
          <p>Serviços</p>
          <p>6</p>
          <div className="fature-box">
            <p>10 a 30 mil </p>
            <button>
              {" "}
              <SlArrowRight />
            </button>
          </div>
        </li>
        <li>
          <p>Nome</p>
          <p>Serviços</p>
          <p>6</p>
          <div className="fature-box">
            <p>10 a 30 mil </p>
            <button>
              {" "}
              <SlArrowRight />
            </button>
          </div>
        </li>
      </ul>
    </LeadsContainer>
  );
};

export default Leads;
