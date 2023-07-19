// ---- Errors ----
export abstract class AuthE extends Error {}

// ---- AuthUnauthorizedE ----
export class AuthUnauthorizedE extends AuthE {
  public name: string = AuthUnauthorizedE.name;
  public message: string = 'Unauthorized access';
}

// ---- AuthInvalidCredentialE ----
export class AuthInvalidCredentialE extends AuthE {
  public name: string = AuthInvalidCredentialE.name;
  public message: string = 'Invalid username or password';
}
