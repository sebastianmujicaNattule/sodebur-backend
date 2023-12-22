import { User } from "../../models/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { FindByIdUserUseCase } from "../../interfaces/use-cases/user/find-by-id-user-use-case";

export class FindByIdUser implements FindByIdUserUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: String): Promise<User | null> {
        const result = await this.userRepository.getUser(id)
        return result
    }
}