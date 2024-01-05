import Testing from './EndPoints/Testing/Index';
import EndPointFallBack from './EndPoints/EndPointFallBack/Index';

const ApiEndPoints = (api: string) => {
  switch (api) {
    case 'Testing':
        return new Testing();
    default:
      return new EndPointFallBack();
  }
};

export default ApiEndPoints;
