import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ProductsController } from "../products.controller";
import { ProductsService } from "../products.service";
import { PrismaService } from "src/services/prisma.service";

describe("Products controller", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe("addProduct should validate the incoming data", () => {
    it("when no data is passed", async () => {
      jest.spyOn(productsService, "addProduct").mockResolvedValue(null);

      try {
        await productsController.addProduct({});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
