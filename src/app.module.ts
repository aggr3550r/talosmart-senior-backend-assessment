import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { ProductService } from './modules/product/product.service';
import { UserController } from './modules/user/user.controller';
import { ProductController } from './modules/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserRepository } from './modules/user/data/user.repository';
import { ProductRepository } from './modules/product/data/product.repository';
import { User } from './modules/user/data/user.entity';
import { Product } from './modules/product/data/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    User,
    Product,
  ],
  controllers: [AppController, UserController, ProductController],
  providers: [
    AppService,
    UserService,
    ProductService,
    UserRepository,
    ProductRepository,
  ],
})
export class AppModule {}
