import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { AddProductDto } from "./dto/addProduct.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async addProduct(data: AddProductDto) {
    const product = await this.prisma.product.create({
      data: { ...data, price: parseFloat(data.price) },
    });
    return product;
  }
}
