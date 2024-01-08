import { IRequestHeaders } from '../../ApiEntryPoint/Interfaces/Index';
import { IOperativeSystemData } from './Interfaces/Index';

class OperativeSystems {
  private mysqlConnection!: any;
  private operativeSystemsList!: IOperativeSystemData[];
  private requestHeaders: IRequestHeaders;

  constructor(mysqlConnection: any, requestHeaders: IRequestHeaders) {
    this.mysqlConnection = mysqlConnection;
    this.requestHeaders = requestHeaders;
  }

  public async init(): Promise<void> {
    await this.setOperativeSystemsList();
  }

  private async setOperativeSystemsList(): Promise<void> {
    const query = 'SELECT * FROM operativeSystems';
    const [rows] = await this.mysqlConnection.query(query);

    this.operativeSystemsList = rows;
  }

  public getOperativeSystemsList(): IOperativeSystemData[] {
    return this.operativeSystemsList;
  }

  public getUserOperativeSystem(): number {
    const fallBackNumber = 29131813;
    const osIndex = this.operativeSystemsList.findIndex(
      (os) => os.name === this.requestHeaders['user-agent']
    );

    return osIndex === -1
      ? fallBackNumber
      : this.operativeSystemsList[osIndex].idOs;
  }
}

export default OperativeSystems;
