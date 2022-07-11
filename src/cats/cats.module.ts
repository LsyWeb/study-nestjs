import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Color])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
