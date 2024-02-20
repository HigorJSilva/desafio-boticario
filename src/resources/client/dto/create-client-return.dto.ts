import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';

export class CreateClientReturnDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  username?: string;

  @IsString()
  @Length(1, 20)
  @IsOptional()
  senha?: string;

  @IsString()
  @Length(1, 200)
  @IsOptional()
  nome?: string;

  @IsString()
  @IsPhoneNumber('BR')
  @IsOptional()
  telefone?: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: Date;

  @IsOptional()
  enderecoId?: number;
}
