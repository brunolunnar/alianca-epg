interface IButtonProps {
  OnClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
}
interface IRegisterData {
  id: string;
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
  email: any;
  aulas: any;
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
interface AulaData {
  id: string;
  curso: boolean;
  title: string;
  video: string;
  "pergunta 01": string;
  "pergunta 02": string;

}

interface Lead {
  email: any;
  data: any;
  id: string;
  name: string;
  segmento: string;
  colaboradores: number;
  faturamento: string;
}
interface DecodedToken {
  email: string;
  name: string;
  isAdmin: boolean;
}