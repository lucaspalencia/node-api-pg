import { noop } from "#/lib/typescript/noop"
import { CreateUserCommand } from "#/users/domain/commands/create-user-comand"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"

export class CreateUserCommandStub extends CreateUserCommand {
  private callback = noop

  public constructor() {
    super(new InMemoryUsersRepository())
  }

  public async execute(): Promise<void> {
    await this.callback()
  }

  public withSuccess(): CreateUserCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess()
    }

    return this
  }
}
