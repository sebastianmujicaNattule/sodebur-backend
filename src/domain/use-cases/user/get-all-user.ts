import { User } from "../../models/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { GetAllUserUseCase } from "../../interfaces/use-cases/user/get-all-user-use-case";

export class GetAllUsers implements GetAllUserUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(): Promise<User [] | null> {
        const result = await this.userRepository.getAllUser()
        return result
    }
}