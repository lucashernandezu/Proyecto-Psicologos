import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email('Email invalido')
});

export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1, 'El token no puede estar vacio'),

    newPassword: z
        .string()
        .min(8, 'La contraseña debe contener minimo 8 caracteres')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'La contraseña debe contener: mayúscula, minúscula, número y símbolo (@$!%*?&)'
        ),
    confirmPassword: z
        .string()
        .min(1, 'La confirmacion es obligatoria')
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']

})