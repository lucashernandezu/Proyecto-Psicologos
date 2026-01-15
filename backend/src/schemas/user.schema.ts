import { z } from 'zod';
import { Role } from '@prisma/client';

export const registerUserSchema = z.object({
  email: z
    .string()
    .email('Email inválido'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),

  role: z.nativeEnum(Role),

  first_name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre es muy largo'),

  last_name: z
    .string()
    .min(1, 'El apellido es requerido')
    .max(255, 'El apellido es muy largo'),

  phone: z
    .string()
    .regex(/^\+569\d{8}$/, 'Teléfono debe tener formato +56912345678'),

  rut: z
    .string()
    .regex(/^\d{7,8}-[\dkK]$/, 'RUT debe tener formato 12345678-9')
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email('Email inválido'),

  password: z
    .string()
    .min(1, 'La contraseña es requerida')
});

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, 'El nombre no puede estar vacio')
    .max(255, 'El nombre es muy largo')
    .optional(),

  last_name: z
    .string()
    .min(1, 'El apellido no puede estar vacio')
    .max(255, 'El apellido es muy largo')
    .optional(),

  phone: z
    .string()
    .regex(/^\+569\d{8}$/, 'Teléfono debe tener formato +56912345678')
    .optional()

})

export const changePasswordSchema = z.object({
  current_password: z
    .string()
    .min(1, 'La contraseña actual es obligatoria'),

  new_password: z
    .string()
    .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'La contraseña debe contener: mayúscula, minúscula, número y símbolo (@$!%*?&)'
    ),

  confirm_password: z
    .string()
    .min(1, 'La confirmación de contraseña es obligatoria')
}).refine((data) => data.new_password === data.confirm_password, {
  message: 'Las contraseñas no coinciden',
  path: ['confirm_password']
});
