export type IRequestProps = null | ITest | IRegisterUserProps;

export interface ITest {
  testValue: string;
}

export interface IRegisterUserProps {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  image: string;
  password: string;
  deleted_at: string;
  created_by: string;
  updated_by: string;
}
