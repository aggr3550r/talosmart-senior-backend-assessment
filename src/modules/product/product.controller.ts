import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateProductDTO } from './dtos/product.dto';
import { ResponseModel } from '../../models/response.model';
import { PageOptionsDTO } from '../../dtos/paging/page-options.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() payload: ICreateProductDTO) {
    try {
      const product = await this.productService.createProduct(payload);

      return new ResponseModel(
        HttpStatus.CREATED,
        'Successfully created product.',
        product,
      );
    } catch (error) {
      return new ResponseModel(error?.statusCode, error?.message, null);
    }
  }

  @Get()
  async getProducts(@Query() query: PageOptionsDTO) {
    try {
      const response = await this.productService.getProducts(query);

      return new ResponseModel(
        HttpStatus.OK,
        'Operation Successful.',
        response,
      );
    } catch (error) {
      return new ResponseModel(error?.statusCode, 'Operation Failed.', null);
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') productId: string) {
    try {
      const response = await this.productService.getProductDetails(productId);

      return new ResponseModel(
        HttpStatus.OK,
        'Operation Successful.',
        response,
      );
    } catch (error) {
      return new ResponseModel(error?.statusCode, 'Operation Failed.', null);
    }
  }
}
