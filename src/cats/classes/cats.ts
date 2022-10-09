import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({ example: 'xiaohuang', description: '名字' })
  name: string;

  @ApiProperty({ example: 3, description: '年龄' })
  age: number;

  @ApiProperty()
  colors: string[];
}
