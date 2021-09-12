import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // useStaticAssets 미들웨어는 express application이라고 명시를 해줘야지 에러가 생가지 않는다. 제네릭으로 NestExpressApplication 추가해주기
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
    // http://localhost:8000/media/cats/aaa.png
    // 이 미들웨어를 사용하면 해당 폴더에 url로 접근할수 있도록 할수 있다.
  });

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, // true로 하게 되면 어떤 프런트앤드 사이트도 접근을 할수 있기 때문에 개발완료후 배포를 할때 특정 URL을 써주는것을 권장한다.
    credentials: true, // 백앤드, 프런트앤드 모두 credentials을 true로 해야한다.
  });
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
