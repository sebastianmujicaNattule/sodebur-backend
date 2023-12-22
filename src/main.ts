import server from './server'
import ContactRouter from './presentation/routers/contact-router'
import UserRouter from './presentation/routers/user-router'

import { ContactRepositoryImpl } from './domain/repositories/contact-repository'
import { CreateContact } from './domain/use-cases/contact/create-contact'

import { UserRepositoryImpl } from './domain/repositories/user-repository'
import { CreateUser } from './domain/use-cases/user/create-user'

import { PGContactDataSource } from './data/data-sources/postgresql/pg-contact-data-source'
import { Pool } from 'pg'
import  mysql  from 'mysql2/promise'

import { MYSQLContactDataSource } from './data/data-sources/mysql/mysql-contact-data-source'
import { MYSQLUserDataSource } from './data/data-sources/mysql/mysql-user-data-source'
//import { MYSQLDataSource } from './data/data-sources/mysql/mysql-generic-data-source'

import { FindByIdUser } from './domain/use-cases/user/find-by-id';
import { DeleteUser } from './domain/use-cases/user/delete-user';
import { GetAllUsers } from './domain/use-cases/user/get-all-user'
import { UpdateUser } from './domain/use-cases/user/update-user'




async function getMysqlDS() {
    
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'sodebur'
    })

    return new MYSQLContactDataSource(db)
}

async function getMysqlDS2() {
    
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'sodebur'
    })

    return new MYSQLUserDataSource(db)
}
/* TODO hacer data source generico
async function getMysqlDSGeneric() {
    
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'sodebur'
    })

    return new MYSQLDataSource(db)
}
*/

async function getPGDS() {

    const db = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'CONTACTSDB',
        password: '',
        port: 5432,
    })
    return new PGContactDataSource(db)
}


(async () => {
    
    //const dataSource = await getPGDS();
    const dataSource = await getMysqlDS();

    const dataSource2 = await getMysqlDS2();

    
    const contactMiddleWare = ContactRouter(
        new CreateContact(new ContactRepositoryImpl(dataSource)),
    )

    const userMiddleWare = UserRouter(
        new CreateUser(new UserRepositoryImpl(dataSource2)),
        new FindByIdUser(new UserRepositoryImpl(dataSource2)),
        new DeleteUser(new UserRepositoryImpl(dataSource2)),
        new GetAllUsers(new UserRepositoryImpl(dataSource2)),
        new UpdateUser(new UserRepositoryImpl(dataSource2))
    )

    server.use("/user", userMiddleWare)
    server.use("/contact", contactMiddleWare)
    server.listen(4000, () => console.log("Running on http://localhost:4000"))

})()
