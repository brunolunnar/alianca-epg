import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";


if (!process.env.EMAIL_HOST_USER || !process.env.EMAIL_HOST_PASSWORD) {
    throw new Error("As variáveis de ambiente EMAIL_HOST_USER e EMAIL_HOST_PASSWORD são necessárias.");
  }
  
  const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
  const emailPort = parseInt(process.env.EMAIL_PORT || "587", 10); 
  const emailHostUser = process.env.EMAIL_HOST_USER;
  const emailHostPassword = process.env.EMAIL_HOST_PASSWORD;
  
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465, 
    auth: {
      user: emailHostUser,
      pass: emailHostPassword,
    },
  });
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { to, subject, text } = req.body;

      const mailOptions = {
        from: process.env.EMAIL_HOST_USER,
        to,
        subject,
        text,
      };

      transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Ocorreu um erro ao enviar o e-mail." });
        } else {
          console.log("E-mail enviado: " + info.response);
          res.status(200).json({ message: "E-mail enviado com sucesso!" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro ao enviar o e-mail." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
