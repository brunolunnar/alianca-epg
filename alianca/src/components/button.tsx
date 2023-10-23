import { ButtonStyled } from "@/styles/components/Button"

export const Button: React.FC<IButtonProps> = ({ OnClick, type }) => {
  return (
    <ButtonStyled onClick={OnClick} type={type}>
      Quero Governar Minha Vida e Meu Negócio!
    </ButtonStyled>
  );
}