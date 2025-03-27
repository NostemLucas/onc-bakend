import { z } from "zod";

export const BlogSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  slug: z.string().optional(),
  image: z.string().url("Debe ser una URL válida").optional(),
  extract: z.string().optional(),
  content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  authorId: z.string(),
  newsStatus: z.enum(["draft", "published"]),
  status: z.enum(["active", "inactive"]),
  createdBy: z.string(),
  publishedBy: z.string().optional(),
  updatedBy: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Blog = z.infer<typeof BlogSchema>;
