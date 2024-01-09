import { IResponseError } from '../ApiEndPoints/Interfaces/Index';
import openEndPoints from '../ApiEndPoints/openEndPoints';
import { IRequestBody, IRequestHeaders } from './Interfaces/Index';
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
  private requestHeaders: IRequestHeaders;

  constructor(props: IRequestBody, requestHeaders: IRequestHeaders) {
    this.userIsLoggedIn = false;
    this.userId = null;
    this.requestBody = props;
    this.mysqlConnection = null;
    this.error = null;
    this.status = false;
    this.response = null;
    this.requestHeaders = requestHeaders;
  }

  public init() {
    return new Promise((resolve) => {
      this.mysqlConnection = GetMysqlConnection();
      resolve(true);
    });
  }

  public execute() {
    return new Promise(async (resolve) => {
      if (this.requestBody.token || !openEndPoints.includes(this.requestBody.api)) {
        const Security = new SessionControl(
          this.mysqlConnection,
          this.requestBody.token,
          this.requestHeaders
        );
        await Security.init();

        if (Security.getTokenStatus() !== true) {
          const error = ApiResponseError('invalidUserToken');
          this.setError(error);
          resolve(false);
        }

        this.setUserId(Security.getUserId());
      }

      await this.executeEndPoint();

      resolve(true);
    });
  }

  private setUserId(userId: number): void {
    this.userId = userId;
  }

  private executeEndPoint() {
    return new Promise(async (resolve) => {
      const EndPoint = ApiEndPoints(this.requestBody.api);

      EndPoint.setRequestHeader(this.requestHeaders);
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
