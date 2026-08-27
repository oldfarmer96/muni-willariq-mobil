import { z } from 'zod';

export const loginSchema = z.object({
  dni: z.string().regex(/^\d{8}$/, 'Ingresa un DNI de 8 digitos.'),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres.').max(72),
});

export type LoginInput = z.infer<typeof loginSchema>;
