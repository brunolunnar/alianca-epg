import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AliancaContainer } from "@/styles/pages/Alianca";
import { FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import jwt, { JwtPayload } from "jsonwebtoken";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


interface AulaData {
  id: string;
  curso: boolean;
  title: string;
  video: string;
  "pergunta 01": string;
  "pergunta 02": string;

}

export const CursoID = () => {
  const [aula, setAula] = useState<AulaData | null>(null);
  const [idAula, setIdAula] = useState<AulaData>({
    id: "",
    curso: false,
    title: "",
    video: "",
    "pergunta 01": "",
    "pergunta 02": "",
  });
  const [user, setUser] = useState<string | JwtPayload | null>("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [hasToken, setHasToken] = useState<any>(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const videoRef = useRef(null);


  const handleVideoEnd = () => {
    setVideoWatched(true);
  };
  const router = useRouter();
  const { url } = router.query;
 


  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const decodecToken = jwt.decode(token as string) as JwtPayload;
    setUser(decodecToken);
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);


  useEffect(() => {
    if (url) {
      fetch(`/api/curso/list/${url as string}`)
        .then((response) => response.json())
        .then((data: { data: AulaData }) => {
          console.log('curso por url:', url)
          setAula(data.data);
     
  
          if (data.data.curso) {
          }
        })
        .catch((error) =>
          console.error("Erro ao buscar detalhes do curso", error)
        );
    }
  }, [url]);
  



  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const decodecToken = jwt.decode(token as string) as JwtPayload;

    fetch(`/api/aula/list/${decodecToken.email}`)
      .then((response) => response.json())
      .then((data) => setIdAula(data.data))

      .catch((error) =>
        console.error(
          "Erro ao buscar a api de listar pelo email as aulas",
          error
        )
      );
  }, []);

  const handleRouter = async () => {
    if (!(hasToken && videoWatched)) {
      toast.error(
        "Por favor, assista ao vídeo e preencha todos os campos obrigatórios."
      );
      return;
    }
  
    if (aula && (!formData[aula["pergunta 01"]] || !formData[aula["pergunta 02"]])) {
      toast.error(
        "Por favor, preencha todos os campos do formulário antes de prosseguir."
      );
      return;
    }
    
  
    if (user && typeof user !== "string" && user.id) {
      try {
        const token = localStorage.getItem("@TOKEN");
        const decodedToken = jwt.decode(token as string) as JwtPayload;

        const responseAula = await fetch(
          `/api/relations/update/${decodedToken.id}/${url}`,
          {
            method: "PATCH",
          }
        );

        if (responseAula.ok) {
          const token = localStorage.getItem("@TOKEN");
          const responseAulaPost = await fetch("/api/aula/create/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });
          if (responseAulaPost.ok) {
            toast.success("Parabéns pelo avanço!");
            setTimeout(() => {
              router.push("/curso");
            }, 2000);
          } else {
            console.error(
              "Erro ao fazer requisição da api aula",
              responseAulaPost.statusText
            );
          }
        } else {
          console.error(
            "Erro ao fazer requisição para a api/aula/update",
            responseAula.statusText
          );
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição para api/aula/update", error);
      }
    } else {
      console.error("Usuário nulo ou em formato não suportado");
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("@TOKEN");
      const decodedToken = jwt.decode(token as string) as JwtPayload;

      const verifyCurso = await fetch(
        `/api/relations/${decodedToken.id}/${url}`
      );
    
      if (!verifyCurso.ok) {
        throw new Error(
          `Erro ao fazer a requisição para api/curso/list/id: ${verifyCurso.statusText}`
        );
      }

      const userData = await verifyCurso.json();
      console.log(userData)

      if (userData.clear) {
        toast.success("Bom demais ter você aqui novamente");
        setTimeout(() => {
          router.push("/curso");
        }, 2000);
      } else {
        handleRouter();
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição para api/curso/list/id", error);
    }
  };

  if (!aula) {
    return <h1>Carregando...</h1>;
  }
  if (!hasToken) {
    return <h1>Realize login </h1>;
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
        <h1>
          Olá,{" "}
          {user && typeof user === "object" && "name" in user
            ? (user as JwtPayload).name
            : ""}
        </h1>

        <h3>
          Muito bom ver você aqui buscando se desenvolver e crescer como
          empresário.
        </h3>
        <div className="video-box">
          {typeof window !== "undefined" && (
            <ReactPlayer
              controls={true}
              onEnded={handleVideoEnd}
              ref={videoRef}
              width="100%"
              url={aula.video}
            />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(e);
            }}
          >
            <label htmlFor={aula["pergunta 01"]}>{aula["pergunta 01"]}</label>
            <textarea
              name={aula["pergunta 01"]}
              value={formData[aula["pergunta 01"]] }
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
              value={formData[aula["pergunta 02"]] }
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
