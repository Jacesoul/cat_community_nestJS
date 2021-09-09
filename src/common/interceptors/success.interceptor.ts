import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // map은 rxjs에서 나온건데 rxjs같은 경우는 nest와 별개의 라이브러리이기 때문에 나중에 공부를 하는것이 좋다.
    // 아래의 data는 response에 대한 값을 받는다.(controller에서 return 한 데이터)
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
