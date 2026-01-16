import prisma from "../config/database";
import transporter from "../config/email";
import { generateToken, getTokenExpiration, isTokenExpired } from "../utils/token.utils";
import { hashPassword } from "../utils/password.utils";
import { ForgotPasswordDTO, ResetPasswordDTO, AuthMessageResponse } from '../types/user.types';

class AuthService {
    async requestPasswordReset(data: ForgotPasswordDTO): Promise<AuthMessageResponse> {

        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) {
            return {
                success: true,
                message: 'Si el email esta registrado, recibiras un correo con las instrucciones'
            };
        }

        const resetToken = generateToken()

        const expiredAt = getTokenExpiration()

        await prisma.user.update({
            where: { id: user.id },
            data: {
                reset_token: resetToken,
                reset_token_expires: expiredAt
            }
        })

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: `<h1>Recuperación de contraseña</h1>
                <p>Hola ${user.first_name},</p>
                <p>Recibimos una solicitud para restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Restablecer Contraseña
                </a>
                <p>Este enlace es válido por 1 hora.</p>
                <p>Si no solicitaste este cambio, ignora este correo.</p>`
        });

        return {
            success: true,
            message: 'Si el email esta registrado, recibiras un correo con las instrucciones'
        }
    }

    async resetPassword(data: ResetPasswordDTO): Promise<AuthMessageResponse> {
        const { token, newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) {
            throw new Error('Las contraseñas no coinciden')
        }

        const user = await prisma.user.findFirst({
            where: { reset_token: token }
        });

        if (!user) {
            throw new Error('Token inválido o expirado');
        };

        if (isTokenExpired(user.reset_token_expires!)) {
            throw new Error('El token ha expirado. Solicita uno nuevo')
        };

        const hashedPassword = await hashPassword(newPassword)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                reset_token: null,
                reset_token_expires: null
            }
        });

        return {
            success: true,
            message: 'Contraseña actualizada correctamente.'
        }
    }

}

export default new AuthService();