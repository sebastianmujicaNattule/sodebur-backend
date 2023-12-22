import { User } from "../../../models/user";

export interface CreateUserUseCase {
    execute(user: User): void;
}