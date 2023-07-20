import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Twitter clone api")
  .setDescription("Based on devchallenge's challenge we create and api to comunicate and store data like Twitter does")
  .setVersion("1.0")
  .addTag("tweeter").addBearerAuth()
  .build();
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api-documentation",app,document);
  await app.listen(3001);
}
bootstrap();
