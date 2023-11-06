import { globalStyle } from "@/styles/global";
import { HomeContainer } from "@/styles/pages/Home";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import Felipe from "@/assets/img/Felipe.png";
import { useRouter } from "next/router";
import { Button } from "@/components/button";

globalStyle();
export default function Home() {
  const router = useRouter();
  const handleRouterRegister = () => {
    router.push("/register");
  };
  const handleRouterLogin = ()=>{
    router.push("/login")
  }

  return (
    <>
      <HomeContainer>
        <Image className="logo" src={Logo} alt="Logotipo da empresa"></Image>
        <div className="login-box" >
          <button className="login-btn" onClick={handleRouterLogin}>Login</button>
        </div>
        <section className="container">
          <h2>Empresário!</h2>
          <section>
            <article className="initial">
              Quantas vezes você se sentiu navegando sozinho na vastidão do
              mundo dos negócios? Cada decisão a tomar, cada desafio a
              enfrentar, sentindo o peso da solidão e da incerteza. Eu sei
              exatamente como você se sente. E, mais do que isso, eu sei o
              caminho para te ajudar a transformar essa realidade.
            </article>
            <article className="presentation-box">
              <div className="presentation">
                Meu nome é Felipe Otelakoski. Sou empresário no ramo da
                tecnologia e mentor de negócios com uma bagagem de mais de 400
                projetos digitais liderados e 13 anos de experiência. Aos 22
                anos, quebrei, perdendo mais ou menos 300 mil. Porém, com
                determinação, construí tudo novamente do zero. Eu conheço as
                dores, os desafios e, mais importante, os caminhos para
                superá-los.
              </div>
              <div className="profile-box">
                <Image src={Felipe} alt="Foto do Felipe Otelakoski"></Image>
              </div>
            </article>
          </section>
          <h2>O perigo do isolamento</h2>
          <article>
            Por experiência própria, digo que caminhar sozinho pode ter um custo
            alto. Visões limitadas, decisões mais arriscadas e desafios
            constantes podem ser consequências da solidão no mundo dos negócios.
            Mas o que aconteceria se você não estivesse sozinho? Se pudesse
            contar com as habilidades e o conhecimento necessários para
            construir alianças sólidas e governar seu negócio com maestria?
          </article>
          <h2>Despertar do Governante</h2>
          <article>
            É por isso que criei o <b> Despertar do Governante</b>, um mini
            treinamento gratuito de 3 aulas, onde compartilho as habilidades que
            todo empresário deve desenvolver para se tornar um verdadeiro
            governante em seu mercado. Um líder capaz de formar e sustentar
            alianças que impulsionem o crescimento e a inovação.
          </article>
          <h2>
            Não caminhe sozinho. Descubra o poder de governar com propósito e
            estratégia.
          </h2>
          <article>
            Clique agora no botão para receber o acesso ao Treinamento{" "}
            <b>Despertar do Governante</b> e dê o primeiro passo para
            transformar sua trajetória empresarial!
          </article>
        </section>
        <Button OnClick={handleRouterRegister}  />
      </HomeContainer>
    </>
  );
}
