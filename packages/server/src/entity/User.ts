import { Entity, Column, PrimaryGeneratedColumn, getRepository } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import bcrypt from 'bcrypt';

interface UserType {
  name?: string;
  email?: string;
  password?: string;
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsNotEmpty()
  password: string;

  constructor({ name, email, password }: UserType = {}) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toJson = () => {
    return {
      name: this.name,
      email: this.email,
    };
  };

  checkPassword = async (otherPassword: string) => {
    try {
      await bcrypt.compare(otherPassword, this.password);
      return true;
    } catch {
      return false;
    }
  };
}
// https://github.com/typeorm/typeorm/issues/4010#issuecomment-612149115
export const getUserRepository = () => getRepository(User);
