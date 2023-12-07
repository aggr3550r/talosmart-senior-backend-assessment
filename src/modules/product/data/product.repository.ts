import {
  DataSource,
  FindManyOptions,
  FindOptionsSelectProperty,
  Repository,
} from 'typeorm';
import { IProductRepository } from '../../../interfaces/database/IProductRepository';
import { Product } from './product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PageOptionsDTO } from '../../../dtos/paging/page-options.dto';
import { PageMetaDTO } from '../../../dtos/paging/page-meta.dto';
import { PageDTO } from '../../../dtos/paging/page.dto';

@Injectable()
export class ProductRepository implements IProductRepository<Product> {
  constructor(
    private repository: Repository<Product>,
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Product);
  }
  async findById(id: string, withFields?: boolean): Promise<Product> {
    const where: FindManyOptions<Product>['where'] = { id, is_active: true };

    let product: Product;

    if (withFields) {
      product = await this.repository.findOne({
        where,
        select: ['id', 'name', 'description', 'minimum_cost', 'maximum_cost'],
      });
    }

    product = await this.repository.findOne({
      where,
    });

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({
      where: {
        name,
        is_active: true,
      },
    });

    return product;
  }

  async create(data: CreateProductDTO): Promise<Product> {
    let newProduct = this.repository.create(data);
    newProduct = await this.repository.save(newProduct);
    return newProduct;
  }

  async update(id: string, data: UpdateProductDTO): Promise<void> {
    await this.repository.update({ id }, data);
  }

  async delete(id: string): Promise<void> {
    const response = await this.repository.update({ id }, { is_active: false });

    if (response.affected < 1) {
      throw new BadRequestException(
        `Could not delete product with that id ${id}. Check to make sure it exists.`,
      );
    }
  }

  async filter(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<Product>> {
    const [items, count] = await this.repository.findAndCount({
      where: { is_active: true },
      order: {
        minimum_cost: 'ASC',
      },
      select: ['id', 'name', 'image_url'],
      skip: pageOptionsDTO?.skip,
      take: pageOptionsDTO?.take,
    });

    const pageMetaDTO = new PageMetaDTO({
      page_options_dto: pageOptionsDTO,
      total_items: count,
    });

    return new PageDTO(items, pageMetaDTO);
  }
}
