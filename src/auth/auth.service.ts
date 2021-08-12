import { CreateUserDto } from '@app/dto/createUser.dto';
import { UserService } from '@app/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import TokenPayload from '@app/auth/tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PostgresErrorCode from '@app/database/postgresErrorCode.enum';

@Injectable()
export class AuthService {

    constructor (
        private readonly usersService : UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async register(createUserDto : CreateUserDto){
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        try {
            const createdUser = await this.usersService.createUser({
                ...createUserDto, 
                password : hashedPassword
            });

            createdUser.password = undefined;
            return createdUser;

        }catch (error) {
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    getCookieWithJwtToken(userId : number) {
        const payload : TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
}
