import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Product } from 'src/resources/product/entities/product.entity';
import { Order } from 'src/resources/order/entities/order.entity';

export class CreateOrderProductReturnDto extends CreateOrderProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product order Id',
    required: true,
    example: 1,
  })
  produtoPedidoId?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Product',
    required: true,
    example: {
      produtoId: 2,
      nomeProduto: 'Creme hidratante',
      descricaoProduto: 'Pele seca e mista',
      precoProduto: '20',
      qtdEstoque: 99,
      dataCadastroProduto: '2024-02-21T01:21:06.000Z',
      categoriaId: 2,
    },
  })
  product: Product;

  @ApiProperty({
    description: 'Order',
    required: true,
    example: {
      pedidoId: 2,
      numeroPedido: null,
      valorTotalPedido: null,
      dataPedido: '2024-02-20T23:38:57.000Z',
      status: null,
      clienteId: 6,
    },
  })
  @IsOptional()
  order: Order;
}
