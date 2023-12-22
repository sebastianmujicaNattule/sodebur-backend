// domain/interfaces/repositories/contact-repository.ts
import { User } from "../../models/user";

export interface UserRepository {
    createUser(user: User): void;
    getUser(id: String): Promise<User | null>;
    deleteUser(id: String): void;
    updateUser(id: String, user: User):void;
    getAllUser(): Promise<User[] | null >
}