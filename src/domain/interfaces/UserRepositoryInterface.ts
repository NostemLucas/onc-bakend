import type { UserModel } from "../models";

export interface UserRepositoryInterface {
  create(user: UserModel): Promise<UserModel>;
  update(user: UserModel): Promise<UserModel>;
  delete(id: string): Promise<UserModel>;
  getDoctors(): Promise<UserModel>;
  getAll(): Promise<UserModel[]>;
}
