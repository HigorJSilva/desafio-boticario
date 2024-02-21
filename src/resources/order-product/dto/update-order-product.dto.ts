import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderProductDto } from './create-order-product.dto';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Product quantity set on order',
    required: false,
    example: 5,
  })
  qtdProdutoPedido?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Product price set on order',
    required: false,
    example: 49.99,
  })
  precoProdutoPedido?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Product Id',
    required: false,
    example: 1,
  })
  produtoId?: number;
}
