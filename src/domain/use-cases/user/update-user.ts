import { User } from "../../models/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { UpdateUserUseCase } from "../../interfaces/use-cases/user/update-user-use-case";

export class UpdateUser implements UpdateUserUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: String, user : User) {
        const result = await this.userRepository.updateUser(id , user)
    }
}