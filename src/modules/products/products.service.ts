import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { AddProductDto } from "./dto/addProduct.dto";
import { UpdateProductDto } from "./dto/updateProduct.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async getProduct(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product;
  }

  async addProduct(data: AddProductDto) {
    const product = await this.prisma.product.create({
      data: { ...data, price: parseFloat(data.price) },
    });
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.delete({ where: { id } });
    return product;
  }

  async updateProduct(data: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: parseFloat(data.price),
      },
    });
    return product;
  }
}
