export class GetCurrentUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute() {
    return this.authRepository.getCurrentUser();
  }