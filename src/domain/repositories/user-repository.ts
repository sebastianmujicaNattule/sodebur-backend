// domain/repositories/contact-repository.ts
import { UserDataSource } from "../../data/interfaces/data-sources/user-data-source";
import { User } from "../models/user";
import { UserRepository } from "../interfaces/repositories/user-repository";
import Helper from "../../helpers/helpers";

export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }
    async createUser(user: User) {
        user.password = (await Helper.encriptar(user.password!)).toString()
        await this.userDataSource.create(user)

    }
    async getUser(id: String): Promise<User | null> {
        const result = await this.userDataSource.getOne(id);
        return result;
    }

    async updateUser(id: String, user : User) {
        const result = await this.userDataSource.updateOne(id,user);
        return result;
    }
    async deleteUser(id: String) {
        const result = await this.userDataSource.deleteOne(id);
        return result;
    }

    async getAllUser(): Promise< User[] | null> {
        const result = await this.userDataSource.getAll();
        return result
    }

}