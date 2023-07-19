// ---- UserPayload ----
export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

// ---- UserFromJwt ----
export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
}
