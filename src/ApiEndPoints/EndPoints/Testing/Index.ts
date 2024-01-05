import EndPointBase from '../../EndPointBase/Index';

class Testing extends EndPointBase {
  public execute() {
    return new Promise(async (resolve) => {
      console.log(this.mysqlConnection)
      this.setStatus(true);
      this.setResponse({a:1,b:2});
      this.setErrorCode('testingError');
      this.setErrorMessage('fefrefer');
      resolve(true);
    });
  }
}

export default Testing;
