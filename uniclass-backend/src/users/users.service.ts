import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByRegNumber(regNumber: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { regNumber },
    });
  }

  async findAllStudents(): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: 'student' },
      order: { regNumber: 'ASC' },
    });
  }
}