import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsDate, MaxDate } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly password : string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly gender : string;

    @IsNotEmpty()
    @IsDate()
    @MaxDate(require('moment')().subtract(13, 'y').toDate())
    @Type(() => Date)
    readonly dateOfBirth: Date;
 
    @IsNotEmpty()
    readonly firstName: string; 

    @IsNotEmpty()
    readonly lastName: string;
}