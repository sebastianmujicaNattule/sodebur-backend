import EndPointBase from '../../EndPointBase/Index';

class EndPointFallBack extends EndPointBase {
  public execute() {
    return new Promise(async (resolve) => {
      resolve(false);
    });
  }
}

export default EndPointFallBack;
