import express from 'express';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/enviar-correo', (req: Request, res: Response) => {
  const { para, asunto, mensaje } = req.body;

  // Configuración de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'tu_correo@gmail.com',
      pass: process.env.SMTP_PASSWORD || 'tu_contraseña',
    },
  });

  // Configuración del correo electrónico
  const mailOptions = {
    from: process.env.SMTP_USER || 'tu_correo@gmail.com',
    to: para,
    subject: asunto,
    text: mensaje,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    res.status(200).send('Correo enviado: ' + info.response);
  });
});

export default router;
