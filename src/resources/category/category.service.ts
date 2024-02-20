import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class CategoryService {
  public static paginateConfig: PaginateConfig<Category> = {
    sortableColumns: ['categoriaId', 'nomeCategoria', 'descricaoCategoria'],
    defaultSortBy: [['categoriaId', 'DESC']],
    searchableColumns: ['categoriaId', 'nomeCategoria', 'descricaoCategoria'],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      categoriaId: [FilterOperator.EQ],
      nomeCategoria: [FilterOperator.ILIKE],
      descricaoCategoria: [FilterOperator.ILIKE],
    },
  };

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Category>> {
    return await paginate(
      query,
      this.categoryRepository,
      CategoryService.paginateConfig,
    );
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
