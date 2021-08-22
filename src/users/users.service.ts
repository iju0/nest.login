import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role.enum';

@Injectable()
export class UsersService {
  private users: Array<User> = [
    {
      email: 'user@example.com',
      password: '123456',
      isActive: true,
      accessToken: '',
      roles: [Role.User],
    },
  ];

  create(createUserDto: CreateUserDto, accessToken: string) {
    const user: User = {
      email: createUserDto.email,
      password: createUserDto.password,
      accessToken: accessToken,
      isActive: false,
      roles: [Role.Admin],
    };
    this.users.push(user);
  }

  findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }

  signUp(user: User) {
    return this.users.map((obj) => {
      if (obj.email === user.email) {
        return { ...obj, isActive: true };
      }
      return obj;
    });
  }
}
