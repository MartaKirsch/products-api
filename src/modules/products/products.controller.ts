import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { AddProductDto } from "./dto/addProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";
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

  @Get(":id")
  async getProductDetails(@Param("id") id: string) {
    try {
      const product = await this.productsService.getProduct(id);

      // if there is no product with given id
      if (!product) throw new Error("A product with this id does not exist!");

      return { ...product };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post()
  async addProduct(@Body() body: any) {
    let data: AddProductDto;
    //validate data
    try {
      data = await this.productsService.validateAddData(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    //save
    try {
      const product = await this.productsService.addProduct(data);
      return { ...product };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    try {
      const product = await this.productsService.deleteProduct(id);
      return { ...product };
    } catch (e) {
      // if there is no product with given id
      if (e.code === "P2025")
        throw new BadRequestException("A product with this id does not exist!");

      throw new InternalServerErrorException(e.message);
    }
  }

  @Put("")
  async updateProduct(@Body() body: UpdateProductDto) {
    try {
      const product = await this.productsService.updateProduct(body);
      return { ...product };
    } catch (e) {
      // if there is no product with given id
      if (e.code === "P2025")
        throw new BadRequestException("A product with this id does not exist!");

      throw new InternalServerErrorException(e.message);
    }
  }
}
