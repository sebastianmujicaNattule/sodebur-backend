import { User } from "../../../models/user";

export interface GetAllUserUseCase {
    execute(): Promise<User [] | null>;
}