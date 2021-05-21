import { noop } from "#/lib/typescript/noop"
import { User } from "#/users/domain/entities/user"
import { ListUsersCommand } from "#/users/domain/commands/list-users-command"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"

export class ListUsersCommandStub extends ListUsersCommand {
  private callback = noop

  public constructor() {
    super(new InMemoryUsersRepository())
  }

  public async execute(): Promise<void> {
    await this.callback()
  }

  public withSuccess(users: User[]): ListUsersCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess(users)
    }

    return this
  }
}
