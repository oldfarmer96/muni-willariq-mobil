import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'Ingresa tus nombres.').max(80),
  lastName: z.string().trim().max(120).optional(),
  dni: z.string().regex(/^\d{8}$/, 'Ingresa un DNI de 8 digitos.'),
  phone: z.string().regex(/^\d{9}$/, 'Ingresa un celular de 9 digitos.'),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres.').max(72),
});

export type RegisterInput = z.infer<typeof registerSchema>;
