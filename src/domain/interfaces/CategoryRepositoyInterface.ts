import type { Category } from "../models";

export interface CategoryInterface {
  create(newBlog: Omit<Category, "id">): Promise<Category>;
  update(updateBlog: Partial<Category>): Promise<Category>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Category[]>;
}
