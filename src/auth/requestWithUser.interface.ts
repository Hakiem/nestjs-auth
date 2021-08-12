import { Request } from 'express';
import { UserEntity } from '@app/user/user.entity';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;