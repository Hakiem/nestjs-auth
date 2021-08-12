import { CreateUserDto } from '@app/dto/createUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '@app/user//user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@app/user/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) 
        private readonly userRepository : UserRepository,
    ){}

    async createUser(createUserDto : CreateUserDto) {
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        
        return await this.userRepository.save(newUser);
    }

    async getByEmail(email : string) {
        const user = await this.userRepository.findOne({ email });
        if(user) return user;

        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND)
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
}
