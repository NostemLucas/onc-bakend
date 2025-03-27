import type { LoginCredentials } from "~/src/application/dtos";
import type { AuthResponse } from "../models";

export interface AuthRepositoryInterface {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  // getCurrentUser(): Promise<AuthUserModel | null>;
}
