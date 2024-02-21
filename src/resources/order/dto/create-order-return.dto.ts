import { ApiProperty } from '@nestjs/swagger';

import { CreateOrderDto } from './create-order.dto';

export class CreateOrderReturnDto extends CreateOrderDto {
  @ApiProperty({
    description: 'Order id',
    required: true,
    example: 1,
  })
  pedidoId: number;
}
