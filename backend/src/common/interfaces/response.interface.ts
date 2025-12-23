export interface IResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: any;
  errors?: IValidationError[];
  timestamp: string;
  path: string;
}

export interface IValidationError {
  field: string;
  message: string;
}

