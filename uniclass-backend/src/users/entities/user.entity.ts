import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

@Entity('UC_USERS')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  googleId?: string;

  @Column({ unique: true })
  regNumber!: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  cohort?: string;

  @Column({ nullable: true })
  photo!: string;

  @Column({ default: 'student' })
  role!: 'lecturer' | 'student';

  @Column({ nullable: true })
  passwordHash?: string;

  @CreateDateColumn()
  createdAt!: Date;

}