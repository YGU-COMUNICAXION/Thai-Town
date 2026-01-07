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
