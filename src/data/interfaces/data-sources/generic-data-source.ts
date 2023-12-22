import { RowDataPacket } from "mysql2"

export interface DataSource {
    create(dto: RowDataPacket): void;
    delete(id: String): void;
    update(id: String, data: RowDataPacket): void;
    getAll(): void;
    getOne(id: String):void;
}