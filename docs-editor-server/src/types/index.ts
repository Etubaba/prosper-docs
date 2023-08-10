export type JwtPayload = {
  email: string;
  sub: string;
};


export interface EmailDataType {
  email: string;
  text?: string;
  html?: string;
}
