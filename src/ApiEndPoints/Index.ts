import Testing from './EndPoints/Testing/Index';
import EndPointFallBack from './EndPoints/EndPointFallBack/Index';
import RegisterUser from './EndPoints/Auth/RegisterUser';

const ApiEndPoints = (api: string) => {
  switch (api) {
    case 'Testing':
        return new Testing();
    case 'RegisterUser':
        return new RegisterUser();
    default:
      return new EndPointFallBack();
  }
};

export default ApiEndPoints;
