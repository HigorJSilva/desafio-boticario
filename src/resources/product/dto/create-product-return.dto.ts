import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class CreateProductReturnDto extends CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product id',
    required: true,
    example: 1,
  })
  produtoId: number;
}
