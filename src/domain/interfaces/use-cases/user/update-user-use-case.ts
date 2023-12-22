import { User } from "../../../models/user";

export interface UpdateUserUseCase {
    execute(id : String, user : User): void;
}