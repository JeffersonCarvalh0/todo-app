import { Entity, Column, PrimaryGeneratedColumn, getRepository } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

interface TodoType {
  id?: number;
  title?: string;
  description?: string;
  done?: boolean;
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

  constructor({ id, title, description, done }: TodoType = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
  }
}

export const getTodoRepository = () => getRepository(Todo);
