export class NotFoundException extends Error {
    status: number;
  
    constructor(message = "Not Found", status = 404) {
      super(message);
      this.status = status;
    }
  }