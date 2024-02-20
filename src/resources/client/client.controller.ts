import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  IApiBadRequestResponse,
  IApiNotFoundResponse,
  IApiUnauthorizedResponse,
} from 'src/shared/interfaces/swagger-schemas';
import { CreateClientReturnDto } from './dto/create-client-return.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiCreatedResponse({
    type: CreateClientReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOkResponse({
    type: CreateClientReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Client not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
