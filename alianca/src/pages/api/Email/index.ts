import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const validRecipients = ["bruno@lunnar.team"];
const emailText = "Oi testando";
const emailSubject = "Despertar Governante";

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
      for (const to of validRecipients) {
        const mailOptions = {
          from: emailHostUser,
          to,
          subject: emailSubject,
          text: emailText,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log("E-mail enviado para " + to + ": " + info.response);
          }
        });
      }

      res.status(200).json({ message: "E-mails enviados com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocorreu um erro ao enviar os e-mails." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
