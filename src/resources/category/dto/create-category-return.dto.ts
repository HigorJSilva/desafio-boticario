import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class CreateCategoryReturnDto extends CreateCategoryDto {
  @ApiProperty({
    description: 'Category id',
    required: true,
    example: 1,
  })
  categoriaId: number;
}
