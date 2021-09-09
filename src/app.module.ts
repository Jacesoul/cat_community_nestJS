import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // cats 라우터에 바인딩을 해주는것이다. * 를 사용하면 전체 엔드포인트에대해 logger가 실행된다.
    mongoose.set('debug', this.isDev); // 개발할때는 찍히고 프러덕션에서는 찍히지 않는다.
  }
}
