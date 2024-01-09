import { IUserToken } from '../Interfaces/Index';
import OperativeSystems from '../../OperativeSystems/Index';
import { IRequestHeaders } from '../../../ApiEntryPoint/Interfaces/Index';

class SessionControl {
  private mysqlConnection: any;
  private userToken: IUserToken;
  private tokenStatus: boolean;
  private currentOS!: number;
  private userId!: number;
  private requestHeaders: IRequestHeaders;

  constructor(
    mysqlConnection: any,
    userToken: IUserToken,
    requestHeaders: IRequestHeaders
  ) {
    this.tokenStatus = false;
    this.mysqlConnection = mysqlConnection;
    this.userToken = userToken;
    this.requestHeaders = requestHeaders;
  }

  public async init(): Promise<void> {
    await this.setCurrentOS();
    await this.validateToken();
  }

  private async setCurrentOS(): Promise<void> {
    const OS = new OperativeSystems(this.mysqlConnection, this.requestHeaders);
    await OS.init();
    this.currentOS = OS.getUserOperativeSystem();
  }

  private async validateToken() {
    if (!this.userToken || !this.userToken.ed || !this.userToken.st) {
      return;
    }

    const query =
      'SELECT * FROM authTokens WHERE token=? AND expireDate=? AND os=? AND status=1';

    const [rows] = await this.mysqlConnection.query(query, [
      this.userToken.st,
      this.userToken.ed,
      this.currentOS,
    ]);

    if (rows.length < 1) {
      return;
    }

    const tokenData = rows[0];

    this.setTokenStatus(true);
    this.setUserId(tokenData.userId);
  }

  private setTokenStatus(tokenStatus: boolean): void {
    this.tokenStatus = tokenStatus;
  }

  private setUserId(userId: number): void {
    this.userId = userId;
  }

  public getTokenStatus(): boolean {
    return this.tokenStatus;
  }

  public getUserId(): number {
    return this.userId;
  }
}
export default SessionControl;
