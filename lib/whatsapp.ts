import type { CreditRequest } from './db';

function fmt(n: number) {
  return new Intl.NumberFormat('es-PY').format(n);
}

function buildMessage(s: CreditRequest): string {
  return [
    `🏦 *Nueva solicitud de crédito*`,
    `ID: \`${s.id}\``,
    ``,
    `👤 *Solicitante*`,
    `Nombre: ${s.nombre}`,
    `CI: ${s.ci}`,
    `Teléfono: ${s.telefono}`,
    ``,
    `💰 *Crédito solicitado*`,
    `Monto: Gs. ${fmt(s.monto)}`,
    `Tipo: ${s.tipoPrestamo}`,
    `Cuotas: ${s.cuotas}`,
    ``,
    `📝 Destino: ${s.destino}`,
    ``,
    `🕐 ${new Date(s.createdAt).toLocaleString('es-PY')}`,
  ].join('\n');
}

export async function sendWhatsAppNotification(s: CreditRequest): Promise<void> {
  const message = buildMessage(s);
  const to = process.env.NOTIFY_WHATSAPP ?? '+595985194953';

  // ── Opción A: Twilio WhatsApp API ───────────────────────────────────
  // Activar configurando TWILIO_ACCOUNT_SID y TWILIO_AUTH_TOKEN en .env.local
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const body = new URLSearchParams({
        From: process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886',
        To: `whatsapp:${to}`,
        Body: message,
      });

      const resp = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(
                `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
              ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        }
      );

      if (!resp.ok) throw new Error(await resp.text());
      console.log(`[WhatsApp] Enviado a ${to} via Twilio`);
    } catch (err) {
      console.error('[WhatsApp] Error Twilio:', err);
    }
    return;
  }

  // ── Opción B: Log (sin credenciales) ───────────────────────────────
  console.log(`[WhatsApp] Notificación preparada para ${to}:`);
  console.log(message);
}
