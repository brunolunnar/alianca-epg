import { useEffect, useState, useRef } from "react";
import { globalStyle } from "@/styles/global";
import { useRouter } from "next/router";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { AliancaContainer } from "@/styles/pages/Alianca";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";


globalStyle();


export const AliancaInitial = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [feedback, setFeedback] = useState({
    "Por que valeu a pena essa aula": "",
    "Quais decisões você toma": "",
  });
  const [hasToken, setHasToken] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const videoRef = useRef(null);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);

  const handleRouter = async () => {
    if (
      feedback["Por que valeu a pena essa aula"] &&
      feedback["Quais decisões você toma"] &&
      hasToken &&
      videoWatched
    ) {
      const token = localStorage.getItem("@TOKEN");

      try {
        const response = await fetch("/api/aula01", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(feedback),
        });

        if (response.ok) {
          const data = await response.json();
  
          router.push("alianca/Final"); // Redireciona para a próxima página
        } else {
          console.error(
            "Erro ao fazer a requisição para api/aula01:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição para api/aula01:", error);
      }
    } else {
      alert(
        "Por favor, preencha todos os campos e assista ao vídeo antes de avançar."
      );
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    handleRouter(); 
  };

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  return (
    <AliancaContainer>
      <header>
        <Image className="logo" src={Logo} alt="logotipo da empresa" />
        <div>1</div>
      </header>
      <div className="container">
        <h1>Olá, {userName}</h1>
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
              url="https://www.youtube.com/watch?v=vkDMs4BcbNU"
            />
          )}
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="feedback">Por que valeu a pena essa aula?</label>
            <textarea
              name="feedback"
              id="feedback"
              value={feedback["Por que valeu a pena essa aula"]}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  "Por que valeu a pena essa aula": e.target.value,
                })
              }
            ></textarea>
            <label htmlFor="decisao">Quais decisões você toma?</label>
            <textarea
              name="decisao"
              id="decisao"
              value={feedback["Quais decisões você toma"]}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  "Quais decisões você toma": e.target.value,
                })
              }
            ></textarea>
            <div className="button-box">
              <button type="submit" disabled={!videoWatched}>
                Liberar próxima aula!
              </button>
            </div>
          </form>
        </div>
      </div>
    </AliancaContainer>
  );
};

export default AliancaInitial;
