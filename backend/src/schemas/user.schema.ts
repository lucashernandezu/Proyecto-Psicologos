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
