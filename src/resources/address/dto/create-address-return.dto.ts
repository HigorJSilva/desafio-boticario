import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class CreateAddressReturnDto extends CreateAddressDto {
  @ApiProperty({
    description: 'Address id',
    required: true,
    example: 1,
  })
  enderecoId: number;
}
