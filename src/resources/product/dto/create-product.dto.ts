import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product name',
    required: true,
    example: 'Creme hidratante',
  })
  nomeProduto: string;

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

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'Category Id',
    required: true,
    example: 1,
  })
  categoriaId: number;
}
