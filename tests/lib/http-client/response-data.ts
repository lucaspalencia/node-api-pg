import { IsString, IsUUID } from "class-validator"

export class ResponseData {
  @IsUUID()
  public id!: string

  @IsString()
  public property1!: string

  @IsString()
  public property2!: string
}
