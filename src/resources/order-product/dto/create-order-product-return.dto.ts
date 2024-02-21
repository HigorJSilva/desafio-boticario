import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderProductReturnDto extends CreateOrderProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product order Id',
    required: true,
    example: 1,
  })
  produtoPedidoId?: number;
}
