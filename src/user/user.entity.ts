import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name : 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ unique : true})
    email: string;

    @Column({ unique: true})
    username : string;

    @Column({ default: ''})
    firstName : string;

    @Column({ default: ''})
    lastName : string;

    @Column({ default: ''})
    gender : string;

    @Column()
    dateOfBirth : Date;

    @Column()
    password : string;

    @BeforeInsert()
    async hashPassword(){

        const saltRounds = 10;
        var password = "Fkdj^45ci@Jad";

        await bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                this.password = hash;
            });
        });
    };
        //this.password = await hash(this.password, 10);
}