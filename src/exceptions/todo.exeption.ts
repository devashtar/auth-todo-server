class ApiError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
    }
}

export class TaskNotFoundExeption extends ApiError {
    constructor(message: string) {
        super(message);
    }
}