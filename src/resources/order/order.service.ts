import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class OrderService {
  public static paginateConfig: PaginateConfig<Order> = {
    sortableColumns: [
      'pedidoId',
      'numeroPedido',
      'dataPedido',
      'valorTotalPedido',
    ],
    defaultSortBy: [['pedidoId', 'DESC']],
    searchableColumns: ['pedidoId', 'numeroPedido', 'dataPedido'],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      pedidoId: [FilterOperator.EQ],
      numeroPedido: [FilterOperator.ILIKE],
      dataPedido: [FilterOperator.EQ],
    },
  };
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Order>> {
    return await paginate(
      query,
      this.orderRepository,
      OrderService.paginateConfig,
    );
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
