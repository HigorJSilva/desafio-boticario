import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number): Promise<Product> {
    return await this.getProduct({
      where: { produtoId: id },
      relations: { category: true },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async getProduct(where: FindOneOptions<Product>): Promise<Product> {
    const product = await this.productRepository.findOne(where);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
