import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mailer.config';
import { ReleaseModule } from './release/release.module';
import { ReleasesModule } from './releases/releases.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		WinstonModule.forRoot(winstonConfig),
		MailerModule.forRoot(mailerConfig),
		UsersModule,
		AuthModule,
		ReleaseModule,
		ReleasesModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
	],
})
export class AppModule {}
