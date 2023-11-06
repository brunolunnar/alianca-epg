import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import { FiLock } from "react-icons/fi";

export const HeaderClass = () => {
  return (
    <header>
    <Image className="logo" src={Logo} alt="logotipo da empresa" />
    <div className="next-box">
      <div className="number">1</div>
      <div className="img-locked">
        <FiLock />
      </div>
      <div className="img-locked">
        <FiLock />
      </div>
      <div className="margin"></div>
    </div>
  </header>
  );
};
