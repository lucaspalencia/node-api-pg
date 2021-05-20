import { injectable } from "inversify"

import { User } from "#/users/domain/entities/user"

@injectable()
export abstract class UsersRepository {
  abstract create(user: User): Promise<void>

  abstract list(): Promise<User[]>
}
