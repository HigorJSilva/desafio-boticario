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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  IApiBadRequestResponse,
  IApiNotFoundResponse,
  IApiUnauthorizedResponse,
} from 'src/shared/interfaces/swagger-schemas';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAddressReturnDto } from './dto/create-address-return.dto';
import {
  ApiOkPaginatedResponse,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiCreatedResponse({
    type: CreateAddressReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressService.create(createAddressDto);
  }

  @ApiOkPaginatedResponse(CreateAddressReturnDto, AddressService.paginateConfig)
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Address>> {
    query.filter = query.filter || {};
    return await this.addressService.findAll(query);
  }

  @ApiOkResponse({
    type: CreateAddressReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Address not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address> {
    return await this.addressService.findOne(+id);
  }

  @ApiOkResponse({
    type: CreateAddressReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Address not found'))
  @ApiBearerAuth('JWT-auth')
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return await this.addressService.update(+id, updateAddressDto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Address not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.addressService.remove(+id);
  }
}
