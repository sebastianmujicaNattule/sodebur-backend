import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import { IUserToken } from '../Interfaces/Index';

class SessionControl {
    private dbConnection: null | Pool;
    private userToken: object | null;
  
    constructor(dbConnection: Pool, userToken: IUserToken) {
      this.dbConnection = dbConnection;
      this.userToken = userToken;
    }
  
    validateToken(){
        return new Promise(async (resolve) => {
            resolve(true);
        })
    }
    
  }
export default SessionControl;
