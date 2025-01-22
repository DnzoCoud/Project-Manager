import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 'sadasdasdasdas',
      firstName: 'John',
      lastName: 'Doe',
      email: 'sasdasdasd',
    },
  ];

  findAll() {
    return this.users;
  }
}
