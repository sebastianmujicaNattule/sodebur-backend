// data/data-sources/contact-data-source.ts
import { ContactRequestModel, ContactResponseModel } from "../../../domain/models/contact";

export interface ContactDataSource {
    create(contact: ContactRequestModel): void;
    deleteOne(id: String): void;
    updateOne(id: String, data: ContactRequestModel): void;
}