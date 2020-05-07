import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  getRepository,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import bcrypt from 'bcrypt';

import Todo from '../entity/Todo';

interface UserType {
  name?: string;
  email?: string;
  password?: string;
  todos?: Todo[];
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

  @Column()
  @IsNotEmpty()
  password: string;

  @OneToMany((type) => Todo, (todo: Todo) => todo.createdBy)
  todos: Todo[];

  constructor({ name, email, password }: UserType = {}) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toJson = () => {
    return {
      name: this.name,
      email: this.email,
      id: this.id,
    };
  };

  checkPassword = async (otherPassword: string) =>
    await bcrypt.compare(otherPassword, this.password);
}
// https://github.com/typeorm/typeorm/issues/4010#issuecomment-612149115
export const getUserRepository = () => getRepository(User);
