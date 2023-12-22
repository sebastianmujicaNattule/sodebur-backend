import { User } from "../../../models/user";

export interface DeleteUserUseCase {
    execute(id: String ): void;
}