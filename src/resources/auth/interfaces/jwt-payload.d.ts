export default interface JwtPayload {
  username: string;
  sub: number;
  iat: Date;
  exp: Date;
}
