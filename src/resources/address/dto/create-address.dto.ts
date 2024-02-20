import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsEnum } from 'class-validator';
import { Uf } from 'src/shared/interfaces/uf.enum';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Codepost envy',
    required: true,
    maximum: 9,
    minimum: 9,
    example: '70863-070',
  })
  @IsString()
  @Length(9, 9)
  cep: string;

  @ApiProperty({
    description: 'Street name',
    required: true,
    maximum: 100,
    minimum: 1,
    example: 'Rua das Margaridas',
  })
  @IsString()
  @Length(1, 100)
  rua: string;

  @ApiProperty({
    description: 'District name',
    required: false,
    maximum: 30,
    minimum: 1,
    example: 'Centro',
  })
  @IsString()
  @Length(1, 30)
  @IsOptional()
  bairro?: string;

  @ApiProperty({
    description: 'City name',
    required: true,
    maximum: 30,
    minimum: 1,
    example: 'Brasília',
  })
  @IsString()
  @Length(1, 30)
  cidade: string;

  @ApiProperty({
    description: 'House number',
    required: false,
    maximum: 10,
    minimum: 1,
    example: '1',
  })
  @IsString()
  @Length(1, 10)
  @IsOptional()
  numero?: string;

  @ApiProperty({
    description: 'Address complement',
    required: false,
    maximum: 100,
    minimum: 1,
    example: '1',
  })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  complemento?: string;

  @ApiProperty({
    description: 'Address complement',
    required: false,
    maximum: 2,
    minimum: 1,
    example: 'DF',
  })
  @IsString()
  @Length(2, 2)
  @IsEnum(Uf)
  @IsOptional()
  uf?: Uf;
}
