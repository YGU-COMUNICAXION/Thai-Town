export async function POST({ request }: { request: Request }) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.message) {
    return new Response(
      JSON.stringify({
        message: "Por favor, completa todos los campos del formulario.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 0);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;
  const smtpTo = process.env.SMTP_TO;
  const smtpSecure = process.env.SMTP_SECURE === "true";

  if (
    !smtpHost ||
    !smtpPort ||
    !smtpUser ||
    !smtpPass ||
    !smtpFrom ||
    !smtpTo
  ) {
    return new Response(
      JSON.stringify({
        message:
          "La configuración del correo no está disponible en este momento.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const { createTransport } = await import("nodemailer");

  const transporter = createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: smtpTo,
    subject: `Nuevo mensaje de contacto: ${body.name}`,
    replyTo: body.email,
    text: `Nombre: ${body.name}\nEmail: ${body.email}\n\nMensaje:\n${body.message}`,
  });

  return new Response(
    JSON.stringify({
      message: "Gracias por tu mensaje. En breve te responderemos.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
