import { User } from "#/users/domain/entities/user"
import { UserModel } from "#/users/infrastructure/repositories/models/user-model"

export class UsersMapper {
  public constructor(private readonly users: UserModel[]) {}

  public mapToUsers(): User[] {
    return this.users.map((user) => new User(
      user.name,
      user.email
    ))
  }
}
