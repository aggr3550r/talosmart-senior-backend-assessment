import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  minimum_cost: number;

  @IsNotEmpty()
  @IsPositive()
  maximum_cost: number;

  @IsOptional()
  @IsString()
  image_url: string;
}
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export type ICreateProductDTO = {} & CreateProductDTO;
export type IUpdateProductDTO = {} & UpdateProductDTO;
