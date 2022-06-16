import { CreateCatsDto } from './create-cats.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateCatsDto extends PartialType(CreateCatsDto) {}
