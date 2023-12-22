/**

import { User } from "../../../domain/models/user";
import { DataSource } from "../../interfaces/data-sources/generic-data-source';
import { SQLDatabaseWrapper } from "../../interfaces/data-sources/sql-database-wrapper";
import mysql from 'mysql2/promise';
import { RowDataPacket } from "mysql2/promise";



export class MYSQLDataSource implements DataSource {

    private db: mysql.Pool
    constructor(db: mysql.Pool) {
        this.db = db
    }

    async create(row: RowDataPacket, table: String) {
        await this.db.query(`insert into ${table} (
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
        await this.db.query(`update ${DB_TABLE} set surname = $1 where id = $2`, [user.nombre, id])
    }

    async getOne(id: String): Promise< User | null> {
        const dbresponse = await this.db.query(`SELECT * FROM ${DB_TABLE} WHERE id = ?`,[id])
        const result : any = dbresponse[0]
        return result
        
    }
}**/