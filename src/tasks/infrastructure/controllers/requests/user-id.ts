import { IsNotEmpty, IsNumber } from "class-validator"

export class UserId {
  @IsNotEmpty()
  @IsNumber()
  public userId!: number
}
