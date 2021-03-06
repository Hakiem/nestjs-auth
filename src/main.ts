if (!process.env.IS_TS_NODE) {
	require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
	.setTitle('Sooq Web API')
	.setDescription('Just nothing much here')
	.setVersion('1.0')
	.addBearerAuth(
	  { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
	  'access-token',
	)
	.build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
