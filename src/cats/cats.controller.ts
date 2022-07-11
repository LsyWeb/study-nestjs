import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CatsService } from './cats.service';
import { Cat } from './classes/cats';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiResponse({
    status: 200,
    description: '成功示例',
    type: Cat,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.catsService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        { message: '请求参数id必传' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.catsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateCatsDto, required: true })
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCats: CreateCatsDto) {
    return this.catsService.create(createCats);
  }

  @Put(':id')
  @ApiBody({ type: CreateCatsDto, required: true })
  update(@Param('id') id: string, @Body() updateCats: UpdateCatsDto) {
    return this.catsService.update(id, updateCats);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
