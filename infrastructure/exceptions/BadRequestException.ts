export class BadRequestException extends Error {
    status: number;
  
    constructor(message = "Bad Request", status = 400) {
      super(message);
      this.status = status;
    }
  }