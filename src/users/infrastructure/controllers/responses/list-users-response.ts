import { classToPlain } from "class-transformer"

import { User } from "#/users/domain/entities/user"

export class ListUsersResponse {
  public constructor(private readonly users: User[]) {}

  public toPlain(): unknown {
    return classToPlain(this.users)
  }
}
