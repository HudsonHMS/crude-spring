export interface ResponseObject<T> {
  responseData: T,
  message: string,
  statusCode: number;
  totalPages?: number;
  totalRegistros?:number;
}
