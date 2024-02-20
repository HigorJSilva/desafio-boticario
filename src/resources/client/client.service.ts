import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.save(createClientDto);
  }

  findAll() {
    return `This action returns all client`;
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

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  async getClient(where: FindOneOptions<Client>): Promise<Client> {
    const client = await this.clientRepository.findOne(where);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }
}
