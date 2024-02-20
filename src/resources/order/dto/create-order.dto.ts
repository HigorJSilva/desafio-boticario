import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Order number',
    required: true,
    example: 123,
  })
  numeroPedido: number;

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

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Client id', required: true, example: 1 })
  clienteId: number;
}
