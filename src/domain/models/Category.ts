import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Category = z.infer<typeof CategorySchema>;
