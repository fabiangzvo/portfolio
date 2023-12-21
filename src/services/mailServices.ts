import nodemailer, { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

interface SendMailProps {
  to: string;
  data: string;
}

export function sendMail({ to, data }: SendMailProps) {
  var email: SendMailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: "Portfolio Contact",
    text: data,
  };

  return transporter.sendMail(email);
}
