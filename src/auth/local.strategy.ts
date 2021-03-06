
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email : string, password : string) : Promise<UserEntity> {
        return this.authService.getAuthenticatedUser(email, password);
    }
}