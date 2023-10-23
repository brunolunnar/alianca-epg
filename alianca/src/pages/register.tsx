import React, { useState } from "react";
import Select from "react-select";
import { globalStyle } from "@/styles/global";
import { RegisterContainer } from "@/styles/pages/Register";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import { register } from "module";

globalStyle();

export const Register = () => {
  const [buttonClicked, setButtonClicked] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    segmento: "",
    colaboradores: "",
    faturamento: "",
  });
  const router = useRouter();
  const handleConfirm = () => {
    router.push("/login");
  };

  const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (buttonClicked) {
      // Evita múltiplos cliques
      return;
    }

    try {
      setButtonClicked(true); // Define o estado como true para desativar o botão

      const response = await fetch("/api/Create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/login");
      } else {
        // Lida com erros aqui, se necessário
      }
    } catch (error) {
      console.error("Erro ao fazer o registro:", error);
    }
  };


  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const segmentoOptions = [
    { value: "Tecnologia da Informação", label: "Tecnologia da Informação" },
    { value: "Saúde e Medicina", label: "Saúde e Medicina" },
    {
      value: "Finanças e Serviços Financeiros",
      label: "Finanças e Serviços Financeiros",
    },
    { value: "Alimentos e Bebidas", label: "Alimentos e Bebidas" },
    { value: "Varejo", label: "Varejo" },
    { value: "Energia", label: "Energia" },
    { value: "Manufatura", label: "Manufatura" },
    { value: "Educação", label: "Educação" },
    { value: "Transporte e Logística", label: "Transporte e Logística" },
    { value: "Construção e Imobiliário", label: "Construção e Imobiliário" },
    { value: "Entretenimento e Mídia", label: "Entretenimento e Mídia" },
    { value: "Agricultura", label: "Agricultura" },
    { value: "Serviços Profissionais", label: "Serviços Profissionais" },
    { value: "Bens de Consumo", label: "Bens de Consumo" },
    { value: "Bens Industriais", label: "Bens Industriais" },
    { value: "Turismo e Hospitalidade", label: "Turismo e Hospitalidade" },
    {
      value: "Meio Ambiente e Sustentabilidade",
      label: "Meio Ambiente e Sustentabilidade",
    },
    { value: "Telecomunicações", label: "Telecomunicações" },
    { value: "Arte e Cultura", label: "Arte e Cultura" },
    { value: "Setor Público", label: "Setor Público" },
  ];

  const outraOpcaoOptions = [
    { value: "opcao01", label: "Até 10 mil" },
    { value: "opcao02", label: "Até 20 mil" },
    { value: "opcao03", label: "Até 30 mil" },
    { value: "opcao04", label: "Até 40 mil" },
    { value: "opcao05", label: "Até 50 mil" },
    { value: "opcao06", label: "Até 60 mil" },
    { value: "opcao07", label: "Até 70 mil" },
    { value: "opcao08", label: "Até 80 mil" },
    { value: "opcao09", label: "Até 90 mil" },
    { value: "opcao10", label: "Até 100 mil" },
    { value: "opcao11", label: "Mais de 100 mil" },
  ];


  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: "black", // Cor de fundo do controle
      border: "solid 3px #DA8A51", // Estilo da borda
      padding: "11px", // Preenchimento
      borderRadius: "30px", // Raio de borda
      width: "300px",
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused ? "#DA8A51" : "black", // Cor de fundo das opções quando em foco
      color: isFocused || isSelected ? "white" : "$textOption", // Cor do texto das opções
      padding: "20px", // Preenchimento das opções
      border: "none",
    }),
  };
  return (
    <RegisterContainer>
      <Image src={LogoImg} alt="Logotipo da empresa" />
      <div className="form-container">
        <h1>Responda para receber acesso</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Seu melhor e-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
          />

          <div className="select-box">
            <Select
              options={segmentoOptions}
              placeholder="Segmento"
              styles={customStyles}
              name="segmento"
              value={segmentoOptions.find(
                (option) => option.value === formData.segmento
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  segmento: selectedOption ? selectedOption.value : "",
                })
              }
            />
          <input
            type="text"
            name="colaboradores"
            placeholder="Colaboradores"
            value={formData.colaboradores}
            onChange={handleChange}
          />
            <Select
              options={outraOpcaoOptions}
              placeholder="Faturamento"
              styles={customStyles}
              name="faturamento"
              value={outraOpcaoOptions.find(
                (option) => option.value === formData.faturamento
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  faturamento: selectedOption ? selectedOption.value : "",
                })
              }
            />
          </div>

          <Button type="submit" disable={buttonClicked}>Registrar</Button>
        </form>
      </div>
    </RegisterContainer>
  );
};
export default Register;
