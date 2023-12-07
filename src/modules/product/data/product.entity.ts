import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { IsPositive, Min } from 'class-validator';

@Entity('product')
export class Product extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  minimum_cost: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
    unsigned: true,
  })
  @IsPositive()
  @Min(0)
  maximum_cost: number;
}
