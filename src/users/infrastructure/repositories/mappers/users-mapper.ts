import { User } from "#/users/domain/entities/user"
import { UserModel } from "#/users/infrastructure/repositories/models/user-model"

export class UsersMapper {
  public static mapToUser(user: UserModel): User {
    return new User(
      user.name,
      user.email
    )
  }

  public static mapToUsers(users: UserModel[]): User[] {
    return users.map((user) => new User(
      user.name,
      user.email
    ))
  }
}
