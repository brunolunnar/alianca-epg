import { globalStyle } from "@/styles/global";
import { useRouter } from "next/router";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { InProcessContainer } from "@/styles/pages/Process";

globalStyle();
export const AliancaInProcess = () => {
  const router = useRouter();
  const handleRouter = () => {
    return router.push("InProcess/Final");
  };
  return (
    <InProcessContainer>
      <header>
        <Image className="logo" src={Logo} alt="logotipo da empresa" />
        <div>2</div>
      </header>
      <div className="container">
        <h1>Olá, Felipe!</h1>
        <h3>
          Muito bom ver você aqui buscando se desenvolver e crescer como
          empresário.
        </h3>
        <div className="video-box">

        <iframe
          className="video"
          src="https://www.youtube.com/embed/I0ScTwHJGoM"
          allowFullScreen
          ></iframe>
        <form>
          <label htmlFor="feedback">Por que valeu a pena essa aula?</label>
          <textarea name="feedback" id="feedback"></textarea>
          <label htmlFor="decisao">Quais decisões você toma?</label>
          <textarea name="decisao" id="decisao"></textarea>
        </form>
        <div className="button-box">

        <button onClick={handleRouter}>Liberar próxima aula!</button>
        </div>
          </div>
      </div>
    </InProcessContainer>
  );
};
export default AliancaInProcess;
