import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import { LoginContainer } from "@/styles/pages/Login";
import Image from "next/image";
import { Button } from "@/components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

globalStyle();

export const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleConfirmLogin = async () => {
    if (!email) {
      return;
    }
    try {
      const response = await axios.post("/api/Login", { email });

      if (response.status === 200) {
        localStorage.setItem("@TOKEN", response.data.token);
      }
      const decodedToken = jwt.decode(response.data.token) as {
        isAdmin: boolean;
      } | null;

      if (decodedToken && decodedToken.isAdmin) {
        router.push("/leads");
      } else if (decodedToken && !decodedToken.isAdmin) {
        router.push("/curso");
      } else {
        console.log("Erro de autenticação:", response.data.error);
      }
    } catch (error) {
      console.error("Erro ao realizar o login:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      router.push("/curso/aula-01");
    }
  }, []);
  return (
    <LoginContainer>
      <Image className="logo" src={Logo} alt="Logotipo da empresa"></Image>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Seu e-mail já cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="button" OnClick={handleConfirmLogin}>
          Confirmar
        </Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
