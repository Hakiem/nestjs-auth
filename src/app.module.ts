import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@app/user/user.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import ormconfig from '@app/ormconfig'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env', 
			isGlobal: true
		}),
		TypeOrmModule.forRoot(ormconfig),
		UserModule,
		TagModule,
		AuthModule], 
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
