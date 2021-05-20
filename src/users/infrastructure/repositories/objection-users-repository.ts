import { injectable } from "inversify"
import { ModelClass } from "objection"

import { User } from "#/users/domain/entities/user"
import { UsersRepository } from "#/users/domain/repositories/users-repository"
import { UserModel } from "#/users/infrastructure/repositories/models/user-model"
import { UsersMapper } from "#/users/infrastructure/repositories/mappers/users-mapper"

@injectable()
export class ObjectionUsersRepository extends UsersRepository {
  private readonly model: ModelClass<UserModel> = UserModel

  public async create(user: User): Promise<void> {
    await this.model.query().insert({
      name: user.name,
      email: user.email,
    })
  }

  public async list(): Promise<User[]> {
    const users = await this.model.query()
    return new UsersMapper(users).mapToUsers()
  }
}
