import { User } from "../../../models/user";

export interface FindByIdUserUseCase {
    execute(id: String): Promise<User | null>;
}