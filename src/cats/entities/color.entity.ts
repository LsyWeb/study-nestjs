import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from './cat.entity';
@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //建立多对多关系
  @ManyToMany(() => Cat, (cat) => cat.colors, {
    cascade: true, //级联关系，创建cat时，根据传入的colors中的数据（['xiaoming','xiaolv']）在数据库生成对应的关系，以及添加新的color数据
  })
  cats: Cat[];
}
