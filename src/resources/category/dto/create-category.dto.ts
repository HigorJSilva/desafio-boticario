import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    required: true,
    maximum: 20,
    example: 'Perfume',
  })
  @IsString()
  @MaxLength(20)
  nomeCategoria: string;

  @ApiProperty({
    description: 'Category description',
    required: false,
    maximum: 200,
    example:
      'Proporciona uma agradável e duradoura fragrância de aroma a diferentes objetos.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  descricaoCategoria?: string;
}
