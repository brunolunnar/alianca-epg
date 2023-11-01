import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AliancaContainer } from "@/styles/pages/Alianca";
import { FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import jwt, { JwtPayload } from "jsonwebtoken";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface AulaData {
  title: string;
  video: string;
  "pergunta 01": string;
  "pergunta 02": string;
}

export const CursoID = () => {
  const [aula, setAula] = useState<AulaData | null>(null);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({});
  const router = useRouter();
  const { id } = router.query;
  

  useEffect(() => {
    if (id) {
      fetch(`/api/curso/list/${id as string}`)
        .then((response) => response.json())
        .then((data: { data: AulaData }) => {
          setAula(data.data);
          setFormData({
            [data.data["pergunta 01"]]: "",
            [data.data["pergunta 02"]]: "",
          });
        })
        .catch((error) =>
          console.error("Erro ao buscar detalhes do curso", error)
        );
    }
  }, [id]);

  const handleFormSubmit = () => {
    const token = localStorage.getItem("@TOKEN");

    if (!token || !aula) {
      return;
    }

    if (
      (!formData[aula["pergunta 01"]] || !formData[aula["pergunta 02"]])
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const requestBody = {
      [aula["pergunta 01"]]: formData[aula["pergunta 01"]],
      [aula["pergunta 02"]]: formData[aula["pergunta 02"]],
    };

    fetch("/api/aula/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao criar aula");
        }
      })
      .then((data: { data: AulaData }) => {
        setAula(data.data);

        toast.success("Aula criada com sucesso!");
      
      })
      .catch((error) => {
        console.error("Erro ao criar aula", error);

        toast.error("Erro ao criar aula");
      });
  };

  if (!aula) {
    return <h1>Carregando...</h1>;
  }

  return (
    <AliancaContainer>
      <header>
        <Image className="logo" src={Logo} alt="logotipo da empresa" />
        <div className="next-box">
          <div className="number">1</div>
          <div className="img-locked">
            <FiLock />
          </div>
          <div className="img-locked">
            <FiLock />
          </div>
          <div className="margin"></div>
        </div>
      </header>
      <div className="container">
        <h1>Olá, usuário</h1>
        <h3>
          Muito bom ver você aqui buscando se desenvolver e crescer como
          empresário.
        </h3>
        <div className="video-box">
          {typeof window !== "undefined" && (
            <ReactPlayer controls={true} width="100%" url={aula.video} />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <label htmlFor={aula["pergunta 01"]}>{aula["pergunta 01"]}</label>
            <textarea
              name={aula["pergunta 01"]}
              value={formData[aula["pergunta 01"]] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [aula["pergunta 01"]]: e.target.value,
                })
              }
         
            ></textarea>
            <label htmlFor={aula["pergunta 02"]}>{aula["pergunta 02"]}</label>
            <textarea
              name={aula["pergunta 02"]}
              value={formData[aula["pergunta 02"]] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [aula["pergunta 02"]]: e.target.value,
                })
              }
              
            ></textarea>
            <div className="button-box">
              <button type="submit">Liberar próxima aula!</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </AliancaContainer>
  );
};

export default CursoID;
