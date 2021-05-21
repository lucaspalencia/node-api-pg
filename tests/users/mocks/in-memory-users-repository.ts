import { User } from "#/users/domain/entities/user"
import { UsersRepository } from "#/users/domain/repositories/users-repository"

export class InMemoryUsersRepository extends UsersRepository {
  public user!: User

  public users!: User[]

  public async create(): Promise<void> {
    // do nothing
  }

  public async list(): Promise<User[]> {
    return this.users
  }

  public async findById(): Promise<User|undefined> {
    return this.user
  }

  public withUsers(users: User[]): InMemoryUsersRepository {
    this.users = users
    return this
  }

  public withUser(user: User): InMemoryUsersRepository {
    this.user = user
    return this
  }
}
