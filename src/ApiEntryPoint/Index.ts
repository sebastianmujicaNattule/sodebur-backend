import {
  IResponseError,
} from '../ApiEndPoints/Interfaces/Index';
import openEndPoints from '../ApiEndPoints/openEndPoints';
import { IRequestBody } from './Interfaces/Index';
import { ApiResponseError, SessionControl } from '../Components/Index';
import GetMysqlConnection from '../Db/GetMysqlConnection';
import ApiEndPoints from '../ApiEndPoints/Index';

class ApiEntryPoint {
  private mysqlConnection: any; //TODO resolve correct typo
  private userIsLoggedIn: boolean;
  private userId: number | null;
  private requestBody: IRequestBody;
  private error: IResponseError | null;
  private status: boolean;
  private response: any;

  constructor(props: IRequestBody) {
    this.userIsLoggedIn = false;
    this.userId = null;
    this.requestBody = props;
    this.mysqlConnection = null;
    this.error = null;
    this.status = false;
    this.response = null;
  }

  public setVars() {
    return new Promise((resolve) => {
      this.mysqlConnection = GetMysqlConnection();
      resolve(true);
    });
  }

  public execute() {
    return new Promise(async (resolve) => {
      if (openEndPoints.includes(this.requestBody.api)) {
        const Security = new SessionControl(
          this.mysqlConnection,
          this.requestBody.token
        );

        const tokenStatus = await Security.validateToken();

        if (tokenStatus !== true) {
          const error = ApiResponseError('invalidToken');
          this.setError(error);
          return;
        }
      }

      await this.executeEndPoint();

      resolve(true);
    });
  }

  private executeEndPoint() {
    return new Promise(async (resolve) => {
      const EndPoint = ApiEndPoints(this.requestBody.api);

      EndPoint.setProps(this.requestBody.props);
      EndPoint.setUserIsLoggedIn(this.userIsLoggedIn);
      EndPoint.setIdUser(this.userId);
      EndPoint.setDatabaseConnection(this.mysqlConnection);
      await EndPoint.execute();

      this.setStatus(EndPoint.getStatus());
      this.setResponse(EndPoint.getResponse());
      this.setError(
        ApiResponseError(EndPoint.getErrorCode(), EndPoint.getErrorMessage())
      );

      resolve(true);
    });
  }

  private setError(error: IResponseError | null) {
    this.error = error;
  }

  private setResponse(response: any) {
    this.response = response;
  }

  private setStatus(status: boolean) {
    this.status = status;
  }

  public getError() {
    return this.error;
  }

  public getResponse() {
    return this.response;
  }

  public getStatus() {
    return this.status;
  }
}

export default ApiEntryPoint;
