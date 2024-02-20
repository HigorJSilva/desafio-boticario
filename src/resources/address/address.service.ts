import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.save(createAddressDto);
  }

  findAll() {
    return `This action returns all address`;
  }

  async findOne(id: number): Promise<Address> {
    return await this.getAddress({ enderecoId: id });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }

  async getAddress(where: Partial<Address>): Promise<Address> {
    const address = await this.addressRepository.findOneBy(where);

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }
}
