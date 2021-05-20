import { inject, injectable } from "inversify"

import { noop } from "#/lib/typescript/noop"
import { User } from "#/users/domain/entities/user"
import { UsersRepository } from "#/users/domain/repositories/users-repository"

@injectable()
export class CreateUserCommand {
  public onSuccess: () => Promise<void> = noop

  public constructor(@inject(UsersRepository) private readonly repository: UsersRepository) {}

  public async execute(user: User): Promise<void> {
    await this.repository.create(user)
    return this.onSuccess()
  }
}
