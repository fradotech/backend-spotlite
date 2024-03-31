export class ApiResponse {
  message: string = "Success";
  data: any;

  static assign(data: ApiResponse) {
    const response = new ApiResponse();

    response.message = data.message;
    response.data = data.data;

    return response;
  }
}
