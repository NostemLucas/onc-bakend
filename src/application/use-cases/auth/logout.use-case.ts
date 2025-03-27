import type { AuthRepositoryImpl } from "~/src/infraestructure/repositories/auth-repository.impl";

export class LogoutUseCase {
  constructor(private authRepository: AuthRepositoryImpl) {}

  async execute() {
    return this.authRepository.logout();
  }
}
