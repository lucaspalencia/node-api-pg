import { noop } from "#/lib/typescript/noop"
import { Task } from "#/tasks/domain/entities/task"
import { ListTasksByUserCommand } from "#/tasks/domain/commands/list-tasks-by-user-command"

import { InMemoryTasksRepository } from "!tests/tasks/mocks/in-memory-tasks-repository"
import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"

export class ListTasksByUserCommandStub extends ListTasksByUserCommand {
  private callback = noop

  public constructor() {
    super(new InMemoryTasksRepository(), new InMemoryUsersRepository())
  }

  public async execute(): Promise<void> {
    await this.callback()
  }

  public withSuccess(tasks: Task[]): ListTasksByUserCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess(tasks)
    }

    return this
  }

  public withUserNotFoundError(): ListTasksByUserCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onUserNotFoundError()
    }

    return this
  }
}
