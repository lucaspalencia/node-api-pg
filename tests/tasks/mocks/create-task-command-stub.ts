import { noop } from "#/lib/typescript/noop"
import { Task } from "#/tasks/domain/entities/task"
import { CreateTaskCommand } from "#/tasks/domain/commands/create-task-command"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"
import { InMemoryTasksRepository } from "!tests/tasks/mocks/in-memory-tasks-repository"

export class CreateTaskCommandStub extends CreateTaskCommand {
  private callback = noop

  public constructor() {
    super(new InMemoryTasksRepository(), new InMemoryUsersRepository())
  }

  public async execute(): Promise<void> {
    await this.callback()
  }

  public withSuccess(task: Task): CreateTaskCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess(task)
    }

    return this
  }

  public withUserNotFoundError(): CreateTaskCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onUserNotFoundError()
    }

    return this
  }
}
