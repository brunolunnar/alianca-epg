import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import { LoginContainer } from "@/styles/pages/Login";
import Image from "next/image";
import { Button } from "@/components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decode } from "punycode";

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
        name: any;
        isAdmin: boolean;
      } | null;

      if (decodedToken && decodedToken.isAdmin) {
        router.push("/leads");
      } else if (decodedToken && !decodedToken.isAdmin) {
        toast.success(`Bem vindo, ${decodedToken.name}!`);
        setTimeout(() => {
          router.push("/curso/aula-1");
        }, 2000);
      } else {
        toast.error("Email inválido.");
        console.log("Erro de autenticação:", response.data.error);
      }
    } catch (error) {
      toast.error("Email inválido.");
      console.error("Erro ao realizar o login:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      router.push("/curso/aula-1");
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        theme="dark"
      />
    </LoginContainer>
  );
};

export default Login;
