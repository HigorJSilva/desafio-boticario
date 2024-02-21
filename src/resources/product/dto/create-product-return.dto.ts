import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { Category } from 'src/resources/category/entities/category.entity';

export class CreateProductReturnDto extends CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product id',
    required: true,
    example: 1,
  })
  produtoId: number;

  @ApiProperty({
    description: 'Product category',
    example: {
      categoriaId: 1,
      nomeCategoria: 'Creme hidratante',
      descricaoCategoria: null,
    },
  })
  category?: Category;
}
