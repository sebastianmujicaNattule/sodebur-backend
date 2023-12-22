import { User } from "../../../domain/models/user";
import { UserDataSource } from "../../interfaces/data-sources/user-data-source";
import { SQLDatabaseWrapper } from "../../interfaces/data-sources/sql-database-wrapper";
import mysql from 'mysql2/promise';
import { RowDataPacket } from "mysql2/promise";


const DB_TABLE = "users"
export class MYSQLUserDataSource implements UserDataSource {

    private db: mysql.Pool
    constructor(db: mysql.Pool) {
        this.db = db
    }

    async create(user: User) {
        await this.db.query(`insert into ${DB_TABLE} (
                                nombre, 
                                apellido, 
                                telefono, 
                                email, 
                                image, 
                                password, 
                                created_at,
                                updated_at,
                                deleted_at,
                                created_by,
                                updated_by
                                
                                ) 
                            values (?,?,?,?,?,?,?,?,?,?,?);`, 
                            [
                                user.nombre,
                                user.apellido,
                                user.telefono,
                                user.email,
                                user.image,
                                user.password,
                                new Date(),
                                new Date(),
                                user.deleted_at,
                                user.created_by,
                                user.updated_by,
                            ])
    }

    async deleteOne(id: String) {
        await this.db.query(`delete from ${DB_TABLE} where id = ?;`, [id])
    }

    async updateOne(id: String, user: User) {
        await this.db.query(`update ${DB_TABLE} set 
                                nombre = ?,
                                apellido = ?,
                                telefono = ?,
                                email = ?,
                                image = ?,
                                password = ?,
                                updated_at = ?,
                                updated_by = ?
                                WHERE id = ? ;`, 
                                [
                                    user.nombre,
                                    user.apellido,
                                    user.telefono,
                                    user.email,
                                    user.image,
                                    user.password,
                                    new Date(),
                                    user.updated_by, 
                                    id
                                ])
    }

    async getOne(id: String): Promise< User | null> {
        const dbresponse = await this.db.query(`SELECT * FROM ${DB_TABLE} WHERE id = ?`,[id])
        const result : any = dbresponse[0]
        return result
        
    }
    async getAll(): Promise < User [] | null> {
        const dbresponse = await this.db.query(`SELECT * FROM ${DB_TABLE};`)
        const result: any = dbresponse[0]
        return result
    }
}