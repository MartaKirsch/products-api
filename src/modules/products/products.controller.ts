import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { AddProductDto } from "./dto/addProduct.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    try {
      const products = await this.productsService.getAllProducts();
      return { products };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post()
  async addProduct(@Body() body: AddProductDto) {
    try {
      const product = await this.productsService.addProduct(body);
      return { product };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
