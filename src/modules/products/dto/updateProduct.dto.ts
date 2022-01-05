import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString({}, { message: "The price must be convertible to a number!" })
  @IsNotEmpty()
  price: string;
}
