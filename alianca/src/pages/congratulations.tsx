import { globalStyle } from "@/styles/global";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import { CongratulationsContainer } from "@/styles/pages/Congratulations";
globalStyle();

export const Congratulations = () => {
  const router = useRouter();
  const handleRouter = () => {
    router.push("/");
  };
  return (
    <CongratulationsContainer>
        <div className="image-box">

      <Image className="logo" src={Logo} alt="Logotipo da empresa"></Image>
        </div>
      <h1>Parabéns, Felipe!</h1>
      <section>
        <h3>
          Se fizer sentido para você, dar o próximo e o momento é Agora, entre
          em contato com nosso consultor que irá lhe Conduzir a uma vida
          <b>Mais Leve</b> e com <b>Mais Lucro!</b>
        </h3>
      </section>

      <Button OnClick={handleRouter} children={undefined}></Button>
    </CongratulationsContainer>
  );
};
export default Congratulations;
