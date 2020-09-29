export class AuthError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class TokenError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class SingUpError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class SingInError extends Error {
    constructor() {
        super('Incorrect email or password');
    }
}

export class UserByEmailError extends Error {
    constructor() {
        super('This email is not found');
    }
}
