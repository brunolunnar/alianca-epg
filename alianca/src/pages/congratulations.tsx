import { globalStyle } from "@/styles/global";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import { CongratulationsContainer } from "@/styles/pages/Congratulations";
import { useState, useEffect } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

globalStyle();

export const Congratulations = () => {
  const [user, setUser] = useState<string | JwtPayload | null>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      const decodedToken = jwt.decode(token) as JwtPayload;
      setUser(decodedToken);
    }
  }, []);

  const handleRouter = () => {
    router.push("https://api.whatsapp.com/message/VTC5UW6LMRQLN1?autoload=1&app_absent=0");
  };

  return (
    <CongratulationsContainer>
      <div className="image-box">
        <Image className="logo" src={Logo} alt="Logotipo da empresa"></Image>
      </div>
      Parabéns {user ? (typeof user === "string" ? user : user.name) : ""}!
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
