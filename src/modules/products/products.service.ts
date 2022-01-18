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

  validateAddData(data: any) {
    //check if the properties exist
    if (!data.name) throw new Error("The product name must be provided!");
    if (!data.price) throw new Error("The product price must be provided!");

    //check if name is string of max length = 100
    if (typeof data.name !== "string" || data.name.length > 100)
      throw new Error(
        "The product name must be a set of characters (max length 100 chars)!",
      );

    //check if price is string
    if (typeof data.price !== "string")
      throw new Error(
        "The price must be a set of characters convertible to a number!",
      );

    if (isNaN(parseFloat(data.price)))
      throw new Error(
        "The price must be a set of characters convertible to a number!",
      );

    return data as AddProductDto;
  }
}
