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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
import { CreateProductReturnDto } from './dto/create-product-return.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({
    type: CreateProductReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOkResponse({
    type: CreateProductReturnDto,
  })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Product not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOkResponse({ type: CreateProductReturnDto })
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Product not found'))
  @ApiBearerAuth('JWT-auth')
  @ApiBadRequestResponse(IApiBadRequestResponse)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+id, updateProductDto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse(IApiUnauthorizedResponse)
  @ApiNotFoundResponse(IApiNotFoundResponse('Product not found'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }
}
