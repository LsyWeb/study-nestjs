import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { Cat } from './entities/cat.entity';
import { Color } from './entities/color.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  findAll(query: PaginationQueryDto) {
    const { page = 1, pageSize = 10 } = query;
    return this.catRepository.find({
      skip: pageSize * (page - 1),
      take: pageSize,
      relations: ['colors'],
    });
  }

  async findOne(id: string) {
    const res = await this.catRepository.findOne({
      where: { id: +id },
      relations: ['colors'],
    });
    if (!res) {
      throw new NotFoundException('this cat not found');
    }
    return res;
  }

  async create(createCats: CreateCatsDto) {
    const colors = await Promise.all(
      createCats.colors.map((name) => this.reploadColorByName(name)),
    );
    const cat = this.catRepository.create({ ...createCats, colors });
    return this.catRepository.save(cat);
  }

  async update(id: string, updateCats: UpdateCatsDto) {
    const colors =
      updateCats.colors &&
      (await Promise.all(
        updateCats.colors.map((name) => this.reploadColorByName(name)),
      ));
    const cat = await this.catRepository.preload({
      id: +id,
      ...updateCats,
      colors,
    });
    if (!cat) {
      throw new NotFoundException('this cat not found');
    }
    return this.catRepository.save(cat);
  }

  async remove(id: string) {
    const cat = await this.findOne(id);
    return this.catRepository.remove(cat);
  }

  async reploadColorByName(name: string): Promise<Color> {
    const existringColor = await this.colorRepository.findOne({
      where: { name },
    });
    if (existringColor) {
      return existringColor;
    }
    return this.colorRepository.create({ name });
  }
}
