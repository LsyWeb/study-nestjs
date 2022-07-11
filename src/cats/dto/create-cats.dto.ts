import { IsString, IsInt } from 'class-validator';
import { Color } from '../entities/color.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCatsDto {
  @ApiProperty({
    name: 'name',
    description: '名字',
    example: 'xiaoliu',
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    name: 'age',
    description: '年龄',
    example: 1,
    required: true,
  })
  @IsInt()
  readonly age: number;

  @ApiProperty({
    name: 'colors',
    description: '颜色',
    example: ['red', 'blue'],
    required: true,
  })
  @IsString({ each: true })
  colors: string[];
}
