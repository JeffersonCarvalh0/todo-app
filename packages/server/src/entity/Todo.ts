import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  getRepository,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import User from '../entity/User';

export interface TodoType {
  id?: number;
  title?: string;
  description?: string;
  done?: boolean;
  createdBy?: User;
}

@Entity()
export default class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne((type) => User, (user: User) => user.todos, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @IsNotEmpty()
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  constructor({ id, title, description, done, createdBy }: TodoType = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
    this.createdBy = createdBy;
  }

  toJson = () => {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      done: this.done,
      createdBy: this.createdBy.toJson(),
      createdAt: this.createdAt,
    };
  };
}

export const getTodoRepository = () => getRepository(Todo);
