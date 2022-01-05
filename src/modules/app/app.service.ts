import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello! You can find full documentation <a target='_blank' href='https://github.com/MartaKirsch/products-api'>here</a>";
  }
}
