import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class ProductService {
  public static paginateConfig: PaginateConfig<Product> = {
    sortableColumns: ['produtoId', 'nomeProduto', 'precoProduto', 'qtdEstoque'],
    defaultSortBy: [['produtoId', 'DESC']],
    searchableColumns: ['produtoId', 'nomeProduto', 'precoProduto'],
    relations: ['category'],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      produtoId: [FilterOperator.EQ],
      nomeProduto: [FilterOperator.ILIKE],
      precoProduto: [FilterOperator.EQ],
    },
  };

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return await paginate(
      query,
      this.productRepository,
      ProductService.paginateConfig,
    );
  }

  async findOne(id: number): Promise<Product> {
    return await this.getProduct({
      where: { produtoId: id },
      relations: { category: true },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getProduct({
      where: { produtoId: id },
    }).catch(() => {
      undefined;
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async remove(id: number): Promise<void> {
    const product = await this.getProduct({ where: { produtoId: id } }).catch(
      () => {
        undefined;
      },
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete({
      produtoId: product.produtoId,
    });
    return;
  }

  async getProduct(where: FindOneOptions<Product>): Promise<Product> {
    const product = await this.productRepository.findOne(where);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
