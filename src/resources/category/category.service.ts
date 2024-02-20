import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number): Promise<Category> {
    return await this.getCategory({ categoriaId: id });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategory({ categoriaId: id }).catch(() => {
      undefined;
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
    });
  }

  async remove(id: number): Promise<void> {
    const category = await this.getCategory({ categoriaId: id }).catch(() => {
      undefined;
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.delete({ categoriaId: category.categoriaId });
    return;
  }

  async getCategory(where: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepository.findOneBy(where);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
