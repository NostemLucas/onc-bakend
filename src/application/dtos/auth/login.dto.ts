import { z } from "zod";

export const LoginCredentialsDto = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña muy corta"),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsDto>;
