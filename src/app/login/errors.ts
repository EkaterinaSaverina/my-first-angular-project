export class AuthError extends Error {
    constructor(message) {
      super(message);
    }
  }
  
  export class TokenError extends Error {
    constructor(message) {
      super(message);
    }
  }
  
  export class SingUpError extends Error {
    constructor(message) {
      super(message);
    }
  }
  
  export class SingInError extends Error {
    constructor(message) {
      super('Incorrect email or password');
    }
  }
  
  export class UserByEmailError extends Error {
    constructor(message) {
      super('This email is not found');
    }
  }
  
  export function getErrors(message) {
    switch (message) {
      case 'No auth token':
        return new AuthError(message);
      case 'invalid token':
        return new TokenError(message);
      case 'Email is already taken':
        return new SingUpError(message);
      case 'Incorrect password':
      case 'Incorrect email':
        return new SingInError(message);
      case 'User not found':
      case `User doesn't exist`:
        return new UserByEmailError(message);
      default:
        return new Error(message);
    }
  }
  