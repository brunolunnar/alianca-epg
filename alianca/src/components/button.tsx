import { ButtonStyled } from "@/styles/components/Button"

export const Button: React.FC<IButtonProps> = ({ OnClick }) => {
    return (
      <ButtonStyled onClick={OnClick}>Quero Governar Minha Vida e Meu Negócio!</ButtonStyled>
    );
  }