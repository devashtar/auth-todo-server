class ApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      this.stack = '';
    }
}

export class InvalidRequestExeption extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class UserValidator extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class СheckFreeEmail extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidUserAccount extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class CheckAuthHeader extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class CheckExistUserExeption extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidTokenExeption extends ApiError {
    constructor(message: string) {
        super(message);
    }
}

export class TokenLimitExeption extends ApiError {
    constructor(message: string) {
        super(message);
    }
}