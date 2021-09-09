import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // context
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    // 에러가 string일 경우와 string이 아닐경우 나누기
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      // res.status(400).send({}) 이렇게 express의 방식과 거의 동일하다.
      response.status(status).json({
        // send를 할건데 json으로 한다는 의미
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...error, // 비구조화 할당
      });
    }
  }
}
