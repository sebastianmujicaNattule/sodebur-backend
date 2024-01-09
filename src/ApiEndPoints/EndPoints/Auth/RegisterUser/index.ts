import { IRegisterUserProps } from '../../../../ApiEntryPoint/Interfaces/RequestProps';
import SessionToken from '../../../../Components/Security/SessionToken/Index';
import EndPointBase from '../../../EndPointBase/Index';

class RegisterUser extends EndPointBase {
  protected props!: IRegisterUserProps;

  public async execute(): Promise<void> {
    const [result] = this.mysqlConnection?.query(this.getQuery(), [
      this.props.nombre,
      this.props.apellido,
      this.props.telefono,
      this.props.email,
      this.props.image,
      this.props.password,
      new Date(),
      new Date(),
      this.props.deleted_at,
      this.props.created_by,
      this.props.updated_by,
    ]);

    if (result.insertId === 0) {
      this.setErrorCode('errorOnRegisterUser');
      this.setErrorMessage('Revisar los campos enviados');
      return;
    }

    
    const newToken = new SessionToken(this.mysqlConnection, result.insertId, this.requestHeader);
    await newToken.createToken();

   if (!newToken.getToken()) {
     this.throwTokenCreationError();
     return;
   }

   this.setStatus(true);
   this.setResponse(newToken.getToken());
  }

  private getQuery(): string {
    return `INSERT INTO users (
                              nombre, 
                              apellido, 
                              telefono, 
                              email, 
                              image, 
                              password, 
                              created_at,
                              updated_at,
                              deleted_at,
                              created_by,
                              updated_by
                              ) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  }

  private throwTokenCreationError(): void {
    this.setErrorCode('tokenCreationError');
    this.setErrorMessage('No se pudo generar el token de sesion.');
  }
}

export default RegisterUser;
