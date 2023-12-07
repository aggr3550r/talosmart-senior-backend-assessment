import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './data/product.repository';
import { CreateProductDTO } from './dtos/product.dto';
import { AppError } from '../../exceptions/app.error';
import { PageOptionsDTO } from '../../dtos/paging/page-options.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository) private productRepository: ProductRepository,
  ) {}

  async createProduct(data: CreateProductDTO) {
    try {
      const product = await this.productRepository.create(data);

      return product;
    } catch (error) {
      console.error('createProduct() error \n %o', error);

      throw new AppError(
        error?.message || 'An error occurred while creating product.',
        error?.statusCode || 400,
      );
    }
  }

  async getProductDetails(productId: string) {
    try {
      const product = await this.productRepository.findById(productId, true);

      return product;
    } catch (error) {
      console.error('getProductDetails() error \n %o', error);

      throw new AppError(
        error?.message || 'An error occurred while getting product details.',
        error?.statusCode || 400,
      );
    }
  }

  async getProducts(pageOptionsDTO: PageOptionsDTO) {
    try {
      const products = await this.productRepository.filter(pageOptionsDTO);

      return products;
    } catch (error) {
      console.error('getProducts() error \n %o', error);

      throw new AppError(
        error?.message || 'An error occurred while getting products.',
        error?.statusCode || 400,
      );
    }
  }
}
