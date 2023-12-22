import { RowDataPacket } from "mysql2"

export interface User extends RowDataPacket {
    id?: string;
    email?: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    image?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
}