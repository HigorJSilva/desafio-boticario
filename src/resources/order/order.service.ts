import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number): Promise<Order> {
    return await this.getOrder({ pedidoId: id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOrder({ pedidoId: id }).catch(() => {
      undefined;
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await this.orderRepository.save({
      ...order,
      ...updateOrderDto,
    });
  }

  async remove(id: number): Promise<void> {
    const order = await this.getOrder({ pedidoId: id }).catch(() => {
      undefined;
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.delete({ pedidoId: order.pedidoId });
    return;
  }

  async getOrder(where: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findOneBy(where);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
