import { Entity, Column, PrimaryGeneratedColumn, getRepository } from 'typeorm';
import { IsEmail, NotEmpty } from 'class-validator';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @NotEmpty()
  name: string;

  @Column()
  @NotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @NotEmpty()
  password: string;

  constructor({ name?: string, email?: string, password?: string }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  const toJson = () => {
    return {
      name: this.name,
      email: this.email,
    };
  }

  const copyWith = ({name?: string, email?: string, password?: string }) => {
    return new User({
      id: this.id,
      name: name || this.name,
      email: email || this.email,
      password: password || this.password
    });
  } 
}

export const UserRepository = getRepository(User);
