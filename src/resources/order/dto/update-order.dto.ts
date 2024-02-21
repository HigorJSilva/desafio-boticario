import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

import { IsOptional, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Order total amount',
    required: false,
    example: 100.5,
  })
  valorTotalPedido?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Order date',
    required: false,
    example: '2022-02-08',
  })
  dataPedido?: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Order status',
    required: false,
    example: true,
  })
  status?: boolean;
}
