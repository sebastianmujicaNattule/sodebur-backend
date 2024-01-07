import { IUserToken } from "../../Components/Security/Interfaces/Index";
import { IRequestProps } from "./RequestProps";

export interface IRequestBody {
    api: string;
    token: IUserToken;
    props: IRequestProps;
}