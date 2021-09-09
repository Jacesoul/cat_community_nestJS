import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(`${req.ip}, ${req.originalUrl}, ${req.method}`);
    res.on('finish', () => {
      // response가 완료가 되었을때를 알려주는 finish라는 이벤트
      this.logger.log(
        `${req.ip}, ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
      // 요청하는거에 대한 정보도 찍히고 반환을 했을때 실패했는지 성공했는지까지도 찍히게 된다.
    });
    next();
  }
}
