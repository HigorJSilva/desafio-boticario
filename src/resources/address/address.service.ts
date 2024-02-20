import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class AddressService {
  public static paginateConfig: PaginateConfig<Address> = {
    sortableColumns: ['enderecoId', 'rua', 'cidade', 'cep'],
    defaultSortBy: [['enderecoId', 'DESC']],
    searchableColumns: ['enderecoId', 'rua', 'cidade', 'cep'],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      enderecoId: [FilterOperator.EQ],
      rua: [FilterOperator.ILIKE],
      cidade: [FilterOperator.ILIKE],
      cep: [FilterOperator.ILIKE],
    },
  };

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.save(createAddressDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Address>> {
    return await paginate(
      query,
      this.addressRepository,
      AddressService.paginateConfig,
    );
  }

  async findOne(id: number): Promise<Address> {
    return await this.getAddress({ enderecoId: id });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.getAddress({ enderecoId: id }).catch(() => {
      undefined;
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return await this.addressRepository.save({
      ...address,
      ...updateAddressDto,
    });
  }

  async remove(id: number): Promise<void> {
    const address = await this.getAddress({ enderecoId: id }).catch(() => {
      undefined;
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    await this.addressRepository.delete({ enderecoId: address.enderecoId });
    return;
  }

  async getAddress(where: Partial<Address>): Promise<Address> {
    const address = await this.addressRepository.findOneBy(where);

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }
}
