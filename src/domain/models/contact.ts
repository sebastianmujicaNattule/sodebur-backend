export interface ContactRequestModel {
    surname: string;
}

export interface ContactResponseModel {
    id: string;
    surname: string;
}

export interface Contact{
    id?: string;
    surname?: string;
    firstName?: string;
    email?: string;
}