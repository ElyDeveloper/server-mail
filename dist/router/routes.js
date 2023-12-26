"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
router.post('/enviar-correo', (req, res) => {
    const { para, asunto, mensaje } = req.body;
    // Configuración de Nodemailer
    const transporter = nodemailer_1.default.createTransport({
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
exports.default = router;
