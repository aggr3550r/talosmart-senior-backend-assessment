import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { ProductService } from './modules/product/product.service';
import { UserController } from './modules/user/user.controller';
import { ProductController } from './modules/product/product.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, UserService, ProductService],
})
export class AppModule {}
