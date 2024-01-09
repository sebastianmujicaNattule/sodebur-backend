import OperativeSystems from '../../OperativeSystems/Index';
import { IRequestHeaders } from '../../../ApiEntryPoint/Interfaces/Index';
import { ICryptToken, IUserToken } from '../Interfaces/Index';
import { v4 as uuidv4 } from 'uuid';

class SessionToken {
  private mysqlConnection: any;
  private userId!: number;
  private status!: boolean;
  private crypedToken!: string;
  private expireDate!: number;
  private requestHeaders: IRequestHeaders;

  constructor(
    mysqlConnection: any,
    userId: number,
    requestHeaders: IRequestHeaders
  ) {
    this.mysqlConnection = mysqlConnection;
    this.userId = userId;
    this.requestHeaders = requestHeaders;
  }

  public async createToken(): Promise<void> {
    const token = await this.cryptToken();

    const sql =
      'INSERT INTO authTokens (userId,token,os,expireDate) VALUES (?,?,?,?)';
    const [result] = await this.mysqlConnection.query(sql, [
      this.userId,
      token.cryptedToken,
      token.os,
      token.expireDate,
    ]);

    if (result.insertId > 0) {
      this.setStatus(true);
      this.setCrypedToken(token.cryptedToken);
      this.setExpireDate(token.expireDate);
    }
  }

  private setStatus(status: boolean): void {
    this.status = status;
  }

  private setCrypedToken(crypedToken: string): void {
    this.crypedToken = crypedToken;
  }

  private setExpireDate(expireDate: number): void {
    this.expireDate = expireDate;
  }

  private async cryptToken(): Promise<ICryptToken> {
    return {
      cryptedToken: uuidv4(),
      expireDate: this.calculateExpireDate(),
      os: await this.getOperativeSystem(),
    };
  }

  private calculateExpireDate(): number {
    const date = new Date();
    const duration = 365; //In Days
    date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);

    return date.getTime();
  }

  private async getOperativeSystem(): Promise<number> {
    const OS = new OperativeSystems(this.mysqlConnection, this.requestHeaders);
    await OS.init();
    return OS.getUserOperativeSystem();
  }

  public getToken(): IUserToken | null {
    if (!this.status) {
      return null;
    }

    return {
      ed: this.expireDate,
      st: this.crypedToken,
    };
  }
}
export default SessionToken;
