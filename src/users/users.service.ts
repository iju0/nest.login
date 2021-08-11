import { Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: Array<User> = [
    {
      email: 'jk3a0123@naver.com',
      password: '123456',
      isActive: false,
      accessToken: '11111',
    },
  ];

  create(createUserDto: CreateUserDto, accessToken: string) {
    const user: User = {
      email: createUserDto.email,
      password: createUserDto.password,
      accessToken: accessToken,
      isActive: false,
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
