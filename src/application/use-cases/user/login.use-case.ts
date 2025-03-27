import type { UserModel, UserRepositoryInterface } from "~/src/domain";
import { LoginDto } from "../../dtos";

export class LoginUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userData: LoginDto): Promise<UserModel> {
    // Validación
    const validatedData = LoginDto.parse(userData);

    // Lógica de negocio adicional si es necesario
    const userToCreate: UserModel = {
      ...validatedData,
      createdAt: new Date(),
    };

    return this.userRepository.login(userToCreate);
  }
}
