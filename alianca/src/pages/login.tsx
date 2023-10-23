import { globalStyle } from "@/styles/global"
import Logo from "@/assets/img/logo.png"
import { LoginContainer } from "@/styles/pages/Login"
import Image from 'next/image'
import { Button } from "@/components/button"
import { useRouter } from "next/router"

globalStyle()


export const Login = () => {
  const router = useRouter();
  const handleConfirmLogin = () => {
    router.push("/alianca");
  };

  return (
    <LoginContainer>
      <Image className="logo" src={Logo} alt="logotipo da empresa" />
      <form>
        <input type="e-mail" placeholder="Seu e-mail já cadastrado" />
      </form>
        <Button OnClick={handleConfirmLogin}>Confirmar</Button>
    </LoginContainer>
  );
}

export default Login;
