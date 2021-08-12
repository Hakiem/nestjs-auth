
import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { UserEntity } from "@app/user/user.entity";

define(UserEntity, (faker: typeof Faker) => {

    const gender = faker.datatype.number(1);

    const newUser = new UserEntity();
    newUser.email = faker.internet.email();
    newUser.firstName = faker.name.firstName(gender);
    newUser.lastName = faker.name.lastName(gender);
    newUser.gender =  faker.name.gender();
    newUser.password = faker.internet.password(8, false, /^[A-Z]*$/);
    
    return newUser;
})