interface IButtonProps{
    OnClick: ()=> void;
    children: React.ReactNode; 
}
interface IRegisterData {
    name: string;
    email: string;
    whatsapp: string;
    segmento: string;
    colaboradores: string;
    faturamento: string;
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