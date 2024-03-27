export interface ResponseObject<T> {
  responseData: T,
  message: string,
  statusCode: number
}
