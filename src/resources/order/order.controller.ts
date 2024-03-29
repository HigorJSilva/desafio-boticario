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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  IApiBadRequestResponse,
  IApiNotFoundResponse,
  IApiUnauthorizedResponse,
} from 'src/shared/interfaces/swagger-schemas';
import { CreateOrderReturnDto } from './dto/create-order-return.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Order } from './entities/order.entity';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiCreatedResponse({
    type: CreateOrderReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Order>> {
    query.filter = query.filter || {};
    return await this.orderService.findAll(query);
  }

  @ApiOkResponse({
    type: CreateOrderReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Order not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(+id);
  }

  @ApiOkResponse({
    type: CreateOrderReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Order not found'))
  @ApiBearerAuth('JWT-auth')
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+id, updateOrderDto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Order not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }
}
