import { IUserLogin } from '../../../../ApiEntryPoint/Interfaces/RequestProps';
import SessionToken from '../../../../Components/Security/SessionToken/Index';
import EndPointBase from '../../../EndPointBase/Index';
import bcrypt from 'bcrypt';

class UserLogin extends EndPointBase {
  protected props!: IUserLogin;

  public async execute(): Promise<void> {
    const query = 'SELECT userId,password FROM users WHERE email=? LIMIT 1';
    const [rows] = await this.mysqlConnection?.query(query, [this.props.email]);

    console.log({rows})
    if (rows.length < 1) {
      this.throwCredentialsError();
      return;
    }

    const user = rows[0];
     const passwordMatch = await bcrypt.compare(this.props.pass, user.password);

    if (!passwordMatch) {
      this.throwCredentialsError();
      return;
    }

     const newToken = new SessionToken(this.mysqlConnection, user.userId, this.requestHeader);
     await newToken.createToken();

    if (!newToken.getToken()) {
      this.throwTokenCreationError();
      return;
    }

    this.setStatus(true);
    this.setResponse(newToken.getToken());
  }

  private throwCredentialsError(): void {
    this.setErrorCode('credentialsError');
    this.setErrorMessage('Parece que las credenciales no son correctas.');
  }

  private throwTokenCreationError(): void {
    this.setErrorCode('tokenCreationError');
    this.setErrorMessage('No se pudo generar el token de sesion.');
  }
}

export default UserLogin;
