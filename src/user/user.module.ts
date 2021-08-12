import { Module } from '@nestjs/common';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/user/user.repository';
import { UserEntity } from './user.entity';

@Module({
  	imports : [
		TypeOrmModule.forFeature([UserRepository, UserEntity])
	],
	controllers: [UserController],
 	providers: [UserService]
})
export class UserModule {}
