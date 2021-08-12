import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
    
    constructor(private readonly userService : UserService) {}

    @Post()
    async createUser(@Body('user') createUserDto : CreateUserDto) : Promise<any> {
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }
}

