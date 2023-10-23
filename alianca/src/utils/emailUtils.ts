import axios from "axios";

export async function sendRegistrationEmail(name: string, email: string) {
  try {
    // Crie um objeto de dados para enviar os dados do usuário, incluindo os detalhes do email
    const formData = {
      name,
      email,
      to: email, // Destinatário do email
      subject: "Despertar do Governante", // Assunto do email
      text: `opa tudo ${name} bem? Att bruno`, // Corpo do email
    };

    // Faça uma solicitação POST para a rota do servidor que envia e-mails
    const response = await axios.post("/api/EmailTeam", formData);

    if (response.status === 200) {
      // Lida com o sucesso do envio de e-mail
      return true;
    } else {
      // Lida com falhas no envio de e-mail
      return false;
    }
  } catch (error) {
    console.error("Erro ao enviar e-mail de registro:", error);
    return false;
  }
}
