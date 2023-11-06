import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { FiLock } from "react-icons/fi";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";

interface Aula {
  clear: boolean;
  // Outras propriedades das aulas, se houver
}

export const HeaderClass = () => {
  const [aulas, setAulas] = useState<Aula[]>([]);

  useEffect(() => {
    const fetchAulas = async () => {
      const token = localStorage.getItem("@TOKEN");
      if (token) {
        const decodedToken = jwt.decode(token as string) as JwtPayload;
        const userUrl = await fetch(`/api/relations/user/${decodedToken.id}`);
        const userData = await userUrl.json();
        setAulas(userData.aulas);
      }
    };

    fetchAulas();
  }, []);

  return (
    <header>
      <Image className="logo" src={Logo} alt="logotipo da empresa" />
      <div className="next-box">
        {aulas.map((aula, index) => (
          <div key={index} className={aula.clear ? "number" : "img-locked"}>
            {aula.clear ? index + 1 : <FiLock />}
          </div>
        ))}
        <div className="margin"></div>
      </div>
    </header>
  );
};
