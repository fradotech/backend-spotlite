import { Request, Response, NextFunction } from "express";

export class ApiQueryRequest {
  take?: number;
  search?: string;
  filterBy?: string;
  filterValue?: string;
}

export class ApiResponse {
  message?: string = "Ok";
  data: Record<string, any> | null = null;

  static assign(data: Record<string, any> | null = null, message = "Ok") {
    const response = new ApiResponse();

    response.message = message;
    response.data = data;

    return response;
  }

  static tryCatch = (callback: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await callback(req, res, next);
        return res.status(200).json(ApiResponse.assign(result));
      } catch (error: any) {
        console.error(error);
        return res.status(error.status).json(ApiResponse.assign(null, error.message));
      }
    };
  };
}
