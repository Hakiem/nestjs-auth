import { Module } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { AuthController } from '@app/auth/auth.controller';
import { JwtStrategy } from '@app/auth/jwt.strategy';
import { LocalStrategy } from '@app/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
	UserModule,
	PassportModule,
	ConfigModule,
	JwtModule.registerAsync({
	  	imports: [ConfigModule],
	  	inject: [ConfigService],
	  	useFactory: async (configService: ConfigService) => ({
			secret: configService.get('JWT_SECRET'),
			signOptions: {
		  		expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
			},
	  	}),
	}),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
