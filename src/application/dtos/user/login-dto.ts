import { z } from "zod";

export const LoginDto = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe ser mayor a 3 caracteres")
    .max(25, "El nombre de usuario debe ser menor a 25 caracteres"),
  password: z
    .string()
    .max(100, "La contraseña debe ser menor a 100 caracteres"),
});

export type LoginDto = z.infer<typeof LoginDto>;
