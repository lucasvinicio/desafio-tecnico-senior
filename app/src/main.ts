import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './exception-filters/bad-request-exception.filter';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { NotFoundExceptionFilter } from './exception-filters/not-found-exception.filter';
import { QueryFailedErrorFilter } from './exception-filters/query-failed-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new QueryFailedErrorFilter(),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter()
  );

  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pomar')
    .setDescription('Pomar API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);
  
  await app.listen(3000);
}
bootstrap();
