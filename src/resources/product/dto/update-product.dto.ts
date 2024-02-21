import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product name',
    required: false,
    example: 'Creme hidratante',
  })
  nomeProduto?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    required: false,
    example: 'Pele seca e mista',
  })
  descricaoProduto?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Product price',
    required: false,
    example: 19.99,
  })
  precoProduto?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Stock quantity',
    required: false,
    example: 100,
  })
  qtdEstoque?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Product registration date',
    required: false,
    example: '2022-02-08',
  })
  dataCadastroProduto?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Category Id',
    required: false,
    example: 1,
  })
  categoriaId?: number;
}
