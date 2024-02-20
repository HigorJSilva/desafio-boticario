import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    description: 'Client email',
    required: false,
    example: 'joaosilva@email.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Client name',
    required: false,
    maximum: 15,
    minimum: 1,
    example: 'Joaosilva',
  })
  @IsString()
  @Length(1, 15)
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Client password',
    required: false,
    maximum: 20,
    minimum: 1,
    example: 'password',
  })
  @IsString()
  @Length(1, 20)
  @IsOptional()
  senha?: string;

  @ApiProperty({
    description: 'Client name',
    required: true,
    maximum: 200,
    minimum: 1,
    example: 'João Silva',
  })
  @IsString()
  @Length(1, 200)
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'Client cpf',
    required: false,
    maximum: 11,
    minimum: 11,
    example: '64489732570',
  })
  @IsOptional()
  @Length(11, 11)
  cpf?: string;

  @ApiProperty({
    description: 'Client fone',
    required: false,
    example: '62984421211',
  })
  @IsString()
  @IsPhoneNumber('BR')
  @IsOptional()
  telefone?: string;

  @ApiProperty({
    description: 'Client birth date',
    required: false,
    example: '2024-02-20',
  })
  @IsDateString()
  @IsOptional()
  dataNascimento?: Date;

  @ApiProperty({
    description: 'Client adderess id',
    required: true,
    example: 1,
  })
  @IsOptional()
  enderecoId?: number;
}
