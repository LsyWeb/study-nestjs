import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn() // 主键
  id: number;

  @Column()
  type: string;

  @Index() // 索引
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
