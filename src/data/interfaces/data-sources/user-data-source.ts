import { User } from "../../../domain/models/user";

export interface UserDataSource {
    create(user: User): void;
    deleteOne(id: String): void;
    updateOne(id: String, data: User): void;
    getOne(id: String):  Promise< User | null>;
    getAll():  Promise< User[] | null>;

}