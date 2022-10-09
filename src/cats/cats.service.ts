import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './entriy/cats.entry';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 0,
      name: 'xiaoming',
      age: 18,
    },
  ];

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    const res = this.cats.find((cat) => cat.id === id);
    if (!res) {
      return new NotFoundException('this cat not found');
    }
    return res;
  }

  create(createCats: any) {
    this.cats.push(createCats);
    return createCats;
  }

  update(id: number, updateCats: any) {
    const catIndex: number = this.cats.findIndex((cat) => cat.id === id);
    this.cats[catIndex] = updateCats;
    return catIndex;
  }

  remove(id: number) {
    const catIndex: number = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex > -1) {
      this.cats.splice(catIndex, 1);
      return catIndex;
    } else {
      return new NotFoundException('this cat not found');
    }
  }
}
