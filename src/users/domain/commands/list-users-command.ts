import { inject, injectable } from "inversify"

import { noop } from "#/lib/typescript/noop"
import { User } from "#/users/domain/entities/user"
import { UsersRepository } from "#/users/domain/repositories/users-repository"

@injectable()
export class ListUsersCommand {
  public onSuccess: (users: User[]) => Promise<void> = noop

  public constructor(@inject(UsersRepository) private readonly repository: UsersRepository) {}

  public async execute(): Promise<void> {
    const users = await this.repository.list()
    return this.onSuccess(users)
  }
}
