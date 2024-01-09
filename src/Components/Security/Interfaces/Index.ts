export interface IUserToken {
  ed: number; //expire date
  st: string; //session token
}

export interface ISessionToken {
  userId: number;
  tokenId: number;
  expireDate: number;
}

export interface ICryptToken {
    cryptedToken: string;
    expireDate: number;
    os: number;
}