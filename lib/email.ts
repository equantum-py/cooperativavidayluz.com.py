import nodemailer from 'nodemailer';
import type { CreditRequest } from './db';

function fmt(n: number) {
  return new Intl.NumberFormat('es-PY').format(n);
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendCreditNotification(s: CreditRequest): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[Email] SMTP no configurado. Solicitud guardada: ${s.id}`);
    return;
  }

  const transporter = createTransport();

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
      <div style="background:#007f5f;padding:24px">
        <h1 style="color:#fff;margin:0;font-size:20px">Nueva solicitud de crédito</h1>
        <p style="color:rgba(255,255,255,.75);margin:6px 0 0;font-size:13px">
          ID: ${s.id} &nbsp;·&nbsp; ${new Date(s.createdAt).toLocaleString('es-PY')}
        </p>
      </div>

      <div style="padding:24px;background:#f9fafb">
        <h2 style="font-size:15px;color:#374151;margin-top:0">Datos del solicitante</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:5px 0;color:#6b7280;width:130px">Nombre</td><td style="color:#111827;font-weight:600">${s.nombre}</td></tr>
          <tr><td style="padding:5px 0;color:#6b7280">Cédula</td><td style="color:#111827">${s.ci}</td></tr>
          <tr><td style="padding:5px 0;color:#6b7280">Teléfono</td><td style="color:#111827">${s.telefono}</td></tr>
          <tr><td style="padding:5px 0;color:#6b7280">Dirección</td><td style="color:#111827">${s.direccion}, ${s.barrio}</td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0">

        <h2 style="font-size:15px;color:#374151">Datos del crédito</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:5px 0;color:#6b7280;width:130px">Monto</td><td style="color:#059669;font-weight:700;font-size:18px">Gs. ${fmt(s.monto)}</td></tr>
          <tr><td style="padding:5px 0;color:#6b7280">Tipo</td><td style="color:#111827">${s.tipoPrestamo}</td></tr>
          <tr><td style="padding:5px 0;color:#6b7280">Cuotas</td><td style="color:#111827">${s.cuotas} cuotas</td></tr>
          <tr><td style="padding:5px 0;color:#6b7280">Destino</td><td style="color:#111827">${s.destino}</td></tr>
          ${s.referencia ? `<tr><td style="padding:5px 0;color:#6b7280">Referencia</td><td style="color:#111827">${s.referencia}</td></tr>` : ''}
        </table>
      </div>

      <div style="padding:14px 24px;background:#fff;text-align:center;font-size:12px;color:#9ca3af">
        Estado: <strong style="color:#f59e0b">PENDIENTE</strong> &nbsp;·&nbsp;
        Cooperativa Vida &amp; Luz — Sistema de Créditos
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Vida & Luz — Créditos" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL ?? 'cooperativa@vida-luz.com.py',
    subject: `🏦 Nueva solicitud ${s.id} — ${s.nombre} — Gs. ${fmt(s.monto)}`,
    html,
  });

  console.log(`[Email] Notificación enviada para ${s.id}`);
}
