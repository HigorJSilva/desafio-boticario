import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { IHashProvider } from 'src/shared/interfaces/hash.provider';
import BcryptAdapter from 'src/shared/providers/hash/bcrypt';
import { ProtectedClient } from './interfaces/protected-client';

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
    @Inject(BcryptAdapter)
    private readonly hash: IHashProvider,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<ProtectedClient> {
    if (createClientDto.senha) {
      createClientDto.senha = await this.hash.generate(createClientDto.senha);
    }

    const client = await this.clientRepository.save(createClientDto);

    const { senha, ...protectedClient } = client;

    return protectedClient;
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

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ProtectedClient> {
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

    if (updateClientDto.senha) {
      updateClientDto.senha = await this.hash.generate(updateClientDto.senha);
    }

    const updatedClient = await this.clientRepository.save({
      ...client,
      ...updateClientDto,
    });

    const { senha, ...protectedClient } = updatedClient;

    return protectedClient;
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
