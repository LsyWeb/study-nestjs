import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() //允许为空（可选）
  @IsPositive() //正数校验（ >0 ）
  page: number;

  @IsOptional()
  @IsPositive()
  pageSize: number;
}
