interface IButtonProps {
  OnClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
}
interface IRegisterData {
  id?: string;
  name: string;
  email: string;
  whatsapp: string;
  segmento: string;
  colaboradores: string;
  faturamento: string;
  isAdmin: boolean;
  aula1: boolean;
  aula2: boolean;
  aula3: boolean;
}
interface ILeadResponse {
  ref: {
    id: string;
  };
  data: {
    name: string;
    email: string;
    whatsapp: string;
    segmento: string;
    colaboradores: string;
    faturamento: string;
  };
}
interface IQuestion01{
  ref: any;
  "Por que valeu a pena essa aula": string;
  "Quais decisões você toma": string;
}
interface IQuestion02{
  "Por que valeu a pena essa aula": string;
  "Quais decisões você toma": string;
}
interface IQuestion03{
  "Por que valeu a pena essa aula": string;
  "Quais decisões você toma": string;
}
