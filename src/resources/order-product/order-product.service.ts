import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProduct } from './entities/order-product.entity';
import { FindOneOptions, Repository } from 'typeorm';
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
export class OrderProductService {
  public static paginateConfig: PaginateConfig<OrderProduct> = {
    sortableColumns: [
      'produtoPedidoId',
      'product.nomeProduto',
      'order.numeroPedido',
    ],
    searchableColumns: [
      'produtoPedidoId',
      'product.nomeProduto',
      'order.numeroPedido',
    ],
    relations: ['product', 'order'],
    defaultSortBy: [['produtoPedidoId', 'DESC']],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      produtoPedidoId: [FilterOperator.EQ],
      'product.nomeProduto': [FilterOperator.ILIKE],
      'order.numeroPedido': [FilterOperator.ILIKE],
    },
  };

  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  async create(
    createOrderProductDto: CreateOrderProductDto,
  ): Promise<OrderProduct> {
    return await this.orderProductRepository.save(createOrderProductDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<OrderProduct>> {
    return await paginate(
      query,
      this.orderProductRepository,
      OrderProductService.paginateConfig,
    );
  }

  async findOne(id: number) {
    return await this.getOrderProduct({
      where: {
        produtoPedidoId: id,
      },
      relations: { product: true, order: true },
    });
  }

  async update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    const orderProduct = await this.getOrderProduct({
      where: { produtoPedidoId: id },
    }).catch(() => {
      undefined;
    });

    if (!orderProduct) {
      throw new NotFoundException('OrderProduct not found');
    }

    return await this.orderProductRepository.save({
      ...orderProduct,
      ...updateOrderProductDto,
    });
  }

  async remove(id: number): Promise<void> {
    const orderProduct = await this.getOrderProduct({
      where: { produtoPedidoId: id },
    }).catch(() => {
      undefined;
    });

    if (!orderProduct) {
      throw new NotFoundException('OrderProduct not found');
    }

    await this.orderProductRepository.delete({
      produtoPedidoId: orderProduct.produtoPedidoId,
    });
    return;
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
