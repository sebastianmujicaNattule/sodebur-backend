import { RowDataPacket } from "mysql2";
import  bcrypt  from "bcrypt";


export default class Helper{
    /**
     * Metodo para encriptar el password
     * @param string 
     * @returns 
     */
    static async encriptar(string : String ): Promise<String> {
        return await bcrypt.hash( string.toString() ,10)
    }    
}