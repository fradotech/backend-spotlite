import { Request, Response, NextFunction } from "express";

export class ApiResponse {
  message: string = "Success";
  data: any;

  static assign(data: any, message?: string) {
    const response = new ApiResponse();

    response.message = data.message;
    response.data = data.data;

    return response;
  }

  static tryCatch = (callback: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await callback(req, res, next);
        return res.status(200).json(ApiResponse.assign(result));
      } catch (error) {
        return res.status(500).json(ApiResponse.assign(error));
      }
    };
  };
  
}