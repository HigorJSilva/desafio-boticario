import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProduct } from './entities/order-product.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(
    createOrderProductDto: CreateOrderProductDto,
  ): Promise<OrderProduct> {
    return await this.orderProductRepository.save(createOrderProductDto);
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  async findOne(id: number) {
    return await this.getOrderProduct({
      where: {
        produtoPedidoId: id,
      },
      relations: { product: true, order: true },
    });
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }

  async getOrderProduct(
    where: FindOneOptions<OrderProduct>,
  ): Promise<OrderProduct> {
    const orderProduct = await this.orderProductRepository.findOne(where);

    if (!orderProduct) {
      throw new NotFoundException('OrderProduct not found');
    }

    return orderProduct;
  }
}
