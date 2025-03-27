import type { Blog } from "../models";

export interface NewRepositoryInterface {
  create(newBlog: Omit<Blog, "id">): Promise<Blog>;
  update(updateBlog: Partial<Blog>): Promise<Blog>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Blog[]>;
}
