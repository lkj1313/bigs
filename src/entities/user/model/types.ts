
export interface User {
  name: string;
  username: string;
}

export interface UserPayload {
  name: string;
  username: string;
  iat: number;
  exp: number;
}
