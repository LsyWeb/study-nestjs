import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { Cat } from './entriy/cats.entry';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Query() query): Cat[] {
    const { page, limit } = query;
    return this.catsService.findAll();
    // return `this is cats page:${page}-limit:${limit}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCats: CreateCatsDto) {
    return this.catsService.create(createCats);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCats: UpdateCatsDto) {
    return this.catsService.update(id, updateCats);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
