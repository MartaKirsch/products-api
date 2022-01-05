import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
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

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: "The price cannot be lower than 0!" })
  price: number;
}
