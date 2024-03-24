import { User } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class userIdParams implements Pick<User, 'id'> {
  @IsUUID(4)
  id: User['id'];
}
