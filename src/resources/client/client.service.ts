import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import {
  FilterOperator,
  NO_PAGINATION,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class ClientService {
  public static paginateConfig: PaginateConfig<Client> = {
    sortableColumns: ['clienteId', 'nome', 'cpf', 'email'],
    defaultSortBy: [['clienteId', 'DESC']],
    searchableColumns: ['clienteId', 'nome', 'cpf', 'telefone', 'email'],
    maxLimit: NO_PAGINATION,
    filterableColumns: {
      clienteId: [FilterOperator.EQ],
      nome: [FilterOperator.ILIKE],
      cpf: [FilterOperator.ILIKE],
      email: [FilterOperator.ILIKE],
    },
  };

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.save(createClientDto);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Client>> {
    return await paginate(
      query,
      this.clientRepository,
      ClientService.paginateConfig,
    );
  }

  async findOne(id: number) {
    return await this.getClient({
      where: {
        clienteId: id,
      },
      relations: { endereco: true },
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.getClient({
      where: {
        clienteId: id,
      },
    }).catch(() => {
      undefined;
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return await this.clientRepository.save({
      ...client,
      ...updateClientDto,
    });
  }

  async remove(id: number): Promise<void> {
    const client = await this.getClient({
      where: {
        clienteId: id,
      },
    }).catch(() => {
      undefined;
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientRepository.delete({ clienteId: client.clienteId });
    return;
  }

  async getClient(where: FindOneOptions<Client>): Promise<Client> {
    const client = await this.clientRepository.findOne(where);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }
}
