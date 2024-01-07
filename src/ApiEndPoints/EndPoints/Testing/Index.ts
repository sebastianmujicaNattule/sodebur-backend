import { ITest } from '../../../ApiEntryPoint/Interfaces/RequestProps';
import EndPointBase from '../../EndPointBase/Index';

class Testing extends EndPointBase {
  protected props!: ITest;
  public execute() {
    return new Promise(async (resolve) => {
      console.log(this.props.testValue);
      this.setStatus(true);
      this.setResponse({ a: 1, b: 2 });
      this.setErrorCode('testingError');
      this.setErrorMessage('fefrefer');
      resolve(true);
    });
  }
}

export default Testing;
