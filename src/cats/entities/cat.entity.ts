import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @JoinTable()
  @ManyToMany(() => Color, (color) => color.cats) //建立多对多关系
  colors: Color[];
}
