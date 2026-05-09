import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { verifyPassword } from './password.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(regNumber: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { regNumber },
    });

    if (!user || user.role !== 'lecturer' || !user.passwordHash) {
      throw new UnauthorizedException('Invalid lecturer credentials');
    }

    if (!verifyPassword(password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid lecturer credentials');
    }

    const payload = {
      sub: user.id,
      regNumber: user.regNumber,
      name: user.name,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      tokenType: 'Bearer',
      user: {
        id: user.id,
        regNumber: user.regNumber,
        name: user.name,
        role: user.role,
      },
    };
  }
}