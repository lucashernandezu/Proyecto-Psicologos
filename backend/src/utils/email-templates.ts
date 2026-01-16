export function welcomeEmailHTML(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">¡Bienvenido, ${firstName}!</h1>
          <p>Gracias por registrarte en nuestro sistema de psicólogos.</p>
          <p>Estamos aquí para ayudarte.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Este es un correo automático, por favor no respondas.
          </p>
        </div>
      </body>
    </html>
  `;
}
