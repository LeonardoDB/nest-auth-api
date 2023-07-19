// ---- Errors ----
export abstract class UserE extends Error {}

// ---- UserAlreadyExistsE ----
export class UserAlreadyExistsE extends UserE {
  public name: string = UserAlreadyExistsE.name;
  public message: string = 'A user with the given parameters already exists';
}
