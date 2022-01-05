import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { env } from "./common/env";
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // for some form validation on the frontend I would add a custom error structure
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const transformedErrors = validationErrors.map((err) => {
          return {
            property: err.property,
            message: Object.entries(err.constraints)[0][1],
          };
        });
        throw new BadRequestException({
          isDtoError: true,
          message: "Invalid data!",
          errors: transformedErrors,
        });
      },
    }),
  );

  await app.listen(env.PORT_BACKEND || 5000);
}
bootstrap();
