import EndPointBase from '../../../EndPointBase/Index';

class RegisterUser extends EndPointBase {
  public execute() {
    return new Promise(async (resolve) => {
      this.mysqlConnection?.query(`
                insert into users (
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
                                                    values (?,?,?,?,?,?,?,?,?,?,?);`, 
    [
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
      this.setStatus(true);
      this.setResponse({a:11,b:22});
      this.setErrorCode('userError');
      this.setErrorMessage('fefrefer');
      resolve(true);
    });
  }
}


export default RegisterUser;
