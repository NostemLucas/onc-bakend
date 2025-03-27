import type { AuthRepositoryImpl } from "~/src/infraestructure/repositories/auth-repository.impl";
import { LoginCredentialsDto, type LoginCredentials } from "../../dtos";
import type { AuthResponse } from "~/src/domain";

export class LoginUseCase {
  constructor(private authRepository: AuthRepositoryImpl) {}

  async execute(credentials: LoginCredentials): Promise<AuthResponse> {
    const validatedData = LoginCredentialsDto.parse(credentials);
    return this.authRepository.login(validatedData);
  }
}
