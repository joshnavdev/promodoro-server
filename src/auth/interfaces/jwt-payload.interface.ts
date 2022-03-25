export interface IJwtPayload {
  sub: string;
  data: IDataPayload;
}

export interface IDataPayload {
  name: string;
  email: string;
}
