import React, { useState } from "react";
import Select from "react-select";
import { globalStyle } from "@/styles/global";
import { RegisterContainer } from "@/styles/pages/Register";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import { register } from "module";
import { sendRegistrationEmail, sendTeamEmail } from "@/utils/emailUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

globalStyle();
interface IFormData{
  name: string,
  email: string,
  whatsapp: string,
  segmento: string,
  colaboradores: string,
  faturamento: string,
}
export const Register = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    whatsapp: "",
    segmento: "",
    colaboradores: "",
    faturamento: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<IFormData>>({
    name: "",
    email: "",
    whatsapp: "",
    segmento: "",
    colaboradores: "",
    faturamento: "",
  });

  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: Partial<IFormData> = {};

    if (!formData.name) {
      errors.name = "Nome é obrigatório";
    }
    if (!formData.email) {
      errors.email = "E-mail é obrigatório";
    }
    if (!formData.whatsapp) {
      errors.whatsapp = "WhatsApp é obrigatório";
    }
    if (!formData.segmento) {
      errors.segmento = "Segmento é obrigatório";
    }
    if (!formData.colaboradores) {
      errors.colaboradores = "Colaboradores é obrigatório";
    }
    if (!formData.faturamento) {
      errors.faturamento = "Faturamento é obrigatório";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setButtonClicked(true);
      const response = await fetch("/api/Create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Registro feito com sucesso!");
         sendRegistrationEmail(
          formData.name,
          formData.email
        );
          sendTeamEmail(
          formData.name,
          formData.email,
          formData.whatsapp,
          formData.faturamento,
          formData.colaboradores,
          formData.segmento
        );
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      console.error("Erro ao fazer o registro:", error);
      toast.error("Erro ao fazer o registro.");
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
    { value: "Até 10 mil", label: "Até 10 mil" },
    { value: "Até 20 mil", label: "Até 20 mil" },
    { value: "Até 30 mil", label: "Até 30 mil" },
    { value: "Até 40 mil", label: "Até 40 mil" },
    { value: "Até 50 mil", label: "Até 50 mil" },
    { value: "Até 60 mil", label: "Até 60 mil" },
    { value: "Até 70 mil", label: "Até 70 mil" },
    { value: "Até 80 mil", label: "Até 80 mil" },
    { value: "Até 90 mil", label: "Até 90 mil" },
    { value: "Até 100 mil", label: "Até 100 mil" },
    { value: "Mais de 100 mil", label: "Mais de 100 mil" },
  ];

  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: "black",
      border: "solid 3px #DA8A51",
      padding: "11px",
      borderRadius: "30px",
      width: "100%",
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused ? "#DA8A51" : "black",
      color: isFocused || isSelected ? "white" : "$textOption",
      padding: "20px",
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
          {formErrors.name && <span className="error">{formErrors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Seu melhor e-mail"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}

          <input
            type="number"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          {formErrors.whatsapp && (
            <span className="error">{formErrors.whatsapp}</span>
          )}

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
            {formErrors.segmento && (
              <span className="error">{formErrors.segmento}</span>
            )}
            <input
              type="number"
              name="colaboradores"
              placeholder="Colaboradores"
              value={formData.colaboradores}
              onChange={handleChange}
            />
            {formErrors.colaboradores && (
              <span className="error">{formErrors.colaboradores}</span>
            )}
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
            {formErrors.faturamento && (
              <span className="error">{formErrors.faturamento}</span>
            )}
          </div>

          <Button type="submit" disable={buttonClicked}>
            Registrar
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
     
        </form>
      </div>
    </RegisterContainer>
  );
};
export default Register;
