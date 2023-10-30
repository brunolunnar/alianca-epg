interface IButtonProps {
    OnClick?: () => void;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset"; 
    disable?: boolean;
  }
interface IRegisterData {
    name: string;
    email: string;
    whatsapp: string;
    segmento: string;
    colaboradores: string;
    faturamento: string;
    isAdmin:boolean;
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