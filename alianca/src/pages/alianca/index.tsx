import { globalStyle } from "@/styles/global";
import { useRouter } from "next/router";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { AliancaContainer } from "@/styles/pages/Alianca";
import { useEffect, useState } from "react";

globalStyle();

export const AliancaInitial = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [decisao, setDecisao] = useState("");
  const [hasToken, setHasToken] = useState(true);

  const checkTokenInLocalStorage = () => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      fetch("api/Auth", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          if (data && data.user && data.user.email) {
            const userEmail = data.user.email;
            const userName = userEmail.substring(0, userEmail.indexOf("@"));
            setUserName(userName);
          }
        })
        .catch((error)=> {
          setHasToken(false);
          console.error("Erro ao verificar o token:", error);
        });
    } else {
      setHasToken(false);
    }
  };

  useEffect(() => {
    checkTokenInLocalStorage();
  }, []);

  useEffect(() => {
    if (!hasToken) {
      router.push("login");
    }
  }, [hasToken]);

  const handleRouter = () => {
    if (feedback && decisao && hasToken) {
      router.push("alianca/InProcess");
    } else {
      alert("Por favor, preencha todos os campos antes de avançar.");
    }
  };

  return (
    <AliancaContainer>
      <header>
        <Image className="logo" src={Logo} alt="logotipo da empresa" />
        <div>1</div>
      </header>
      <div className="container">
        {hasToken ? (
          <div>
            <h1>Olá, {userName}</h1>
            <h3>
              Muito bom ver você aqui buscando se desenvolver e crescer como empresário.
            </h3>
            <div className="video-box">
              <iframe
                className="video"
                src="https://www.youtube.com/watch?v=vkDMs4BcbNU"
                allowFullScreen
              ></iframe>
              <form>
                <label htmlFor="feedback">
                  Por que valeu a pena essa aula?
                </label>
                <textarea
                  name="feedback"
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <label htmlFor="decisao">Quais decisões você toma?</label>
                <textarea
                  name="decisao"
                  id="decisao"
                  value={decisao}
                  onChange={(e) => setDecisao(e.target.value)}
                ></textarea>
              </form>
              <div className="button-box">
                <button onClick={handleRouter}>Liberar próxima aula!</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AliancaContainer>
  );
};

export default AliancaInitial;
