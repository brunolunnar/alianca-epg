import Image from "next/image";
import Logo from '@/assets/img/logo.png'

export const HeaderClass = () => {

  return (
    <header>
      <Image className="logo" src={Logo} alt="logotipo da empresa" />
      <div className="progress-bar">
        <div className="progress"></div>
      </div>

    </header>
  );
};
