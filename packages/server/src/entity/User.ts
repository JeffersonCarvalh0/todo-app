import { Entity, Column, PrimaryGeneratedColumn, getRepository } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

interface UserType {
  name?: string;
  email?: string;
  password?: string;
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  constructor({ name, email, password }: UserType) {
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
}

export const UserRepository = getRepository(User);
