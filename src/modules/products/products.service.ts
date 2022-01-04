import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return "Hello, this is products service!";
  }
}
