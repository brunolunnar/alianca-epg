import { useEffect, useState, useRef } from "react";
import { globalStyle } from "@/styles/global";
import { useRouter } from "next/router";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { AliancaContainer } from "@/styles/pages/Alianca";
import dynamic from "next/dynamic";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


globalStyle();

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const AliancaInitial = () => {
  const [user, setUser] = useState<string | JwtPayload | null>("");
  const router = useRouter();
  const [feedback, setFeedback] = useState({
    "Por que valeu a pena essa aula": "",
    "Quais decisões você toma": "",
  });
  const [hasToken, setHasToken] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const decodedToken = jwt.decode(token as string) as JwtPayload;
    setUser(decodedToken);
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
        const response = await fetch("/api/aula02", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(feedback),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success("Parabéns pelo avanço! ")
          setTimeout(()=>{

            router.push("/alianca/aula02");
          },2000)
        } else {
          console.error(
            "Erro ao fazer a requisição para api/aula02:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição para api/aula02:", error);
      }
    } else {
      toast.error(
        "Por favor, preencha todos os campos e assista ao vídeo antes de avançar."
      );
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    handleRouter();
  };

  return (
    <AliancaContainer>
      <header>
        <Image className="logo" src={Logo} alt="logotipo da empresa" />
        <div>1</div>
      </header>
      <div className="container">
        <h1>
          Olá, {user ? (typeof user === "string" ? user : user.name) : ""}
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

export default AliancaInitial;
