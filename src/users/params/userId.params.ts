import { IsUUID } from 'class-validator';
import { User } from 'src/types';

export class userIdParams implements Pick<User, 'id'> {
  @IsUUID(4)
  id: User['id'];
}
