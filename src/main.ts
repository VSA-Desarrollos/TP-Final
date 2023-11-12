
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configura CORS aquí
  app.enableCors({
    origin: ['http://localhost:3001', 'https://tp-final-39700.web.app', 'https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io'], // Cambia esta URL al dominio del frontend
    credentials: true, // Habilita las credenciales (cookies, encabezados de autenticación, etc.)
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
  .setTitle('Demostracion API')
  .setDescription('Backend API Dorrego')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

  await app.listen(8080);

}
bootstrap();
