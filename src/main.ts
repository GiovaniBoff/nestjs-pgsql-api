import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
	const logger = WinstonModule.createLogger(winstonConfig);
	const app = await NestFactory.create(AppModule, { logger });

	const config = new DocumentBuilder()
		.setTitle('Users api')
		.setDescription('API description')
		.setVersion('1.0')
		.addTag('cats')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
