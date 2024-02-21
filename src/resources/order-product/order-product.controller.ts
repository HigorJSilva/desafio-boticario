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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderProductService } from './order-product.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  IApiBadRequestResponse,
  IApiNotFoundResponse,
  IApiUnauthorizedResponse,
} from 'src/shared/interfaces/swagger-schemas';
import { CreateOrderProductReturnDto } from './dto/create-order-product-return.dto';
import { OrderProduct } from './entities/order-product.entity';
import {
  ApiOkPaginatedResponse,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';

@Controller('order-product')
@ApiTags('OrderProduct')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @ApiCreatedResponse({ type: CreateOrderProductReturnDto })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderProductDto: CreateOrderProductDto) {
    return await this.orderProductService.create(createOrderProductDto);
  }

  @ApiOkPaginatedResponse(
    CreateOrderProductReturnDto,
    OrderProductService.paginateConfig,
  )
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<OrderProduct>> {
    query.filter = query.filter || {};
    return await this.orderProductService.findAll(query);
  }

  @ApiOkResponse({
    type: CreateOrderProductReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('OrderProduct not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderProductService.findOne(+id);
  }

  @ApiOkResponse({
    type: CreateOrderProductReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('OrderProduct not found'))
  @ApiBearerAuth('JWT-auth')
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderProductDto: UpdateOrderProductDto,
  ) {
    return await this.orderProductService.update(+id, updateOrderProductDto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('OrderProduct not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderProductService.remove(+id);
  }
}
