import { IsString, IsInt } from 'class-validator';
export class CreateCatsDto {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly age: number;
}
