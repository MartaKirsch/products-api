import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { env } from "./common/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(env.PORT_BACKEND || 5000);
}
bootstrap();
