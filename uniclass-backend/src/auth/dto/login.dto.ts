import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  regNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}