export class UnauthorizedException extends Error {
    status: number;
  
    constructor(message = "Unauthorized", status = 401) {
      super(message);
      this.status = status;
    }
  }