class ApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
    }
}

export class ServiceAccessExeption extends ApiError {
    constructor(message: string) {
        super(message);
    }
}