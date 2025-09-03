// libs/api-interfaces/src/lib/responses/_base.response.ts
export class BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T;

  constructor(success: boolean, data?: T, message?: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}