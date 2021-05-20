import { IsString } from "class-validator"

import { User } from "#/users/domain/entities/user"

export class CreateUserRequest {
  @IsString()
  public name!: string

  @IsString()
  public email!: string

  public toDomain(): User {
    return new User(
      this.name,
      this.email
    )
  }
}
