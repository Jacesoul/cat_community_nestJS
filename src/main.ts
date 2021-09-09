import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true, // true로 하게 되면 어떤 프런트앤드 사이트도 접근을 할수 있기 때문에 개발완료후 배포를 할때 특정 URL을 써주는것을 권장한다.
    credentials: true, // 백앤드, 프런트앤드 모두 credentials을 true로 해야한다.
  });
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
