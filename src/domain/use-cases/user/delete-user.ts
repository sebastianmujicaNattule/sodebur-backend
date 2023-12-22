import { User } from "../../models/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { DeleteUserUseCase } from "../../interfaces/use-cases/user/delete-user-use-case";


export class DeleteUser implements DeleteUserUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: String) {
        await this.userRepository.deleteUser(id)
    }
}