import { IUserToken } from '../../Components/Security/Interfaces/Index';
import { IRequestProps } from './RequestProps';

export interface IRequestBody {
  api: string;
  token: IUserToken;
  props: IRequestProps;
}

export interface IRequestHeaders {
  'content-length': string;
  'accept-encoding': string;
  accept: string;
  'user-agent': string;
  'content-type': string;
  host: string;
  connection: string;
}
