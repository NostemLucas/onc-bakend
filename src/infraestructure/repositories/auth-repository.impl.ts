import type { LoginCredentials } from "~/src/application";
import type { AuthResponse } from "~/src/domain";
import type { AuthRepositoryInterface } from "~/src/domain/interfaces/auth-repository.interface";
import {
  HttpClientFactory,
  type HttpClient,
} from "~/src/shared/data-sources/base-datasource";

export class AuthRepositoryImpl implements AuthRepositoryInterface {
  private client: HttpClient;
  private endpoint: string = "/auth";

  constructor(baseUrl?: string) {
    this.client = HttpClientFactory.createNuxtClient(baseUrl);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.client.post<AuthResponse, LoginCredentials>(
      `${this.endpoint}/login`,
      credentials
    );
  }

  async logout(): Promise<void> {
    await this.client.post(`${this.endpoint}/logout`, {});
  }

  /*   async getCurrentUser(): Promise<User | null> {
    try {
      return await this.client.get<User>(`${this.endpoint}/current-user`);
    } catch {
      return null;
    }
  } */
}
