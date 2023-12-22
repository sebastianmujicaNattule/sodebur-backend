import { ContactRequestModel, ContactResponseModel, Contact } from "../../../domain/models/contact";
import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { SQLDatabaseWrapper } from "../../interfaces/data-sources/sql-database-wrapper";
import mysql from 'mysql2/promise';


const DB_TABLE = "contact"
export class MYSQLContactDataSource implements ContactDataSource {

    private db: mysql.Pool
    constructor(db: mysql.Pool) {
        this.db = db
    }

    async create(contact: Contact) {
        console.log(contact)
        await this.db.query(`insert into ${DB_TABLE} (surname, firstname, email) values (?,?,?);`, 
                            [
                                contact.surname,
                                contact.firstName,
                                contact.email
                            ])
    }

    async deleteOne(id: String) {
        await this.db.query(`delete ${DB_TABLE} where id = $1`, [id])
    }

    async updateOne(id: String, data: ContactRequestModel) {
        await this.db.query(`update ${DB_TABLE} set surname = $1 where id = $2`, [data.surname, id])
    }



}