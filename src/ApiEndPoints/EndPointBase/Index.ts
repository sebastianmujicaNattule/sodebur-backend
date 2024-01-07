import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import { IRequestProps } from '../../ApiEntryPoint/Interfaces/RequestProps';

class EndPointBase {
  protected errorCode!: null | string;
  protected errorMessage!: null | string;
  protected response!: any;
  protected status!: boolean;
  protected mysqlConnection!: null | Pool;
  protected props!: IRequestProps;
  protected userIsLoggedIn!: boolean;
  protected userId!: null | number;

  public setUserIsLoggedIn(status: boolean) {
    this.userIsLoggedIn = status;
  }

  public setIdUser(userId: number | null) {
    this.userId = userId;
  }

  public getUserIsLoggedIn() {
    return this.userIsLoggedIn;
  }

  public setProps(props: IRequestProps) {
    this.props = props;
  }

  public setDatabaseConnection(mysqlConnection: Pool) {
    this.mysqlConnection = mysqlConnection;
  }

  public getResponse() {
    return this.response;
  }

  public getStatus() {
    return this.status;
  }

  public getErrorMessage() {
    return this.errorMessage;
  }

  public getErrorCode() {
    return this.errorCode;
  }

  public getIdUser() {
    return this.userId;
  }

  public execute() {
    return new Promise(async (resolve) => {
      resolve(true);
    });
  }

  protected setStatus(status: boolean){
    this.status = status;
  }
  protected setResponse(response: any){
    this.response = response;
  }
  protected setErrorCode(errorCode: string){
    this.errorCode = errorCode;
  }
  protected setErrorMessage(errorMessage: string){
    this.errorMessage = errorMessage;
  }
}

export default EndPointBase;
