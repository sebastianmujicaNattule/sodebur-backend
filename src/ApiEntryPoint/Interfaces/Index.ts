import { IUserToken } from "../../Components/Security/Interfaces/Index";

export interface IRequestBody {
    api: string;
    token: IUserToken;
    props: string;
}