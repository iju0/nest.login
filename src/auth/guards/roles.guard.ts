import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../../role.enum';
import { ROLES_KEY } from '../../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('check roles...');

    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      throw new HttpException(
        '올바른 요청이 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { user } = context.switchToHttp().getRequest();

    const isPossible = roles.some((role) => user.roles?.includes(role));

    if (!isPossible) {
      throw new HttpException(
        '권한을 찾을 수 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
