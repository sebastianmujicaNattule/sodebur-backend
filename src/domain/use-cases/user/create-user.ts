import { User } from "../../models/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { CreateUserUseCase } from "../../interfaces/use-cases/user/create-user-use-case";


export class CreateUser implements CreateUserUseCase {
    userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(user: User) {
        await this.userRepository.createUser(user)

    }
}