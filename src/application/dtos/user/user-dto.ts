import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  firstName: z
    .string()
    .min(3, "Los nombres deben ser mayores a 3 caracteres")
    .max(100, "Los nombres debe ser menores a 100 caracteres"),
  lastName: z
    .string()
    .min(3, "Los apellidos deben ser mayor a 3 caracteres")
    .max(100, "Los apellidos deben ser menores a 100 caracteres"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe ser mayor a 3 caracteres")
    .max(25, "El nombre de usuario debe ser menor a 25 caracteres"),
  email: z
    .string()
    .min(3, "El email de usuario debe ser mayor a 3 caracteres")
    .max(25, "El email de usuario debe ser menor a 25 caracteres"),
  phone: z
    .string()
    .min(3, "El telefono debe ser mayor a 3 caracteres")
    .max(10, "El telefono debe ser menor a 10 caracteres"),
  avatar: z.string().url("Debe ser una URL válida").optional(),
});

export type User = z.infer<typeof UserSchema>;
