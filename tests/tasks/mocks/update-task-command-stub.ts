import { noop } from "#/lib/typescript/noop"
import { Task } from "#/tasks/domain/entities/task"
import { UpdateTaskCommand } from "#/tasks/domain/commands/update-task-command"

import { InMemoryTasksRepository } from "!tests/tasks/mocks/in-memory-tasks-repository"

export class UpdateTaskCommandStub extends UpdateTaskCommand {
  private callback = noop

  public constructor() {
    super(new InMemoryTasksRepository())
  }

  public async execute(): Promise<void> {
    await this.callback()
  }

  public withSuccess(task: Task): UpdateTaskCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess(task)
    }

    return this
  }

  public withTaskNotFoundError(): UpdateTaskCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onTaskNotFoundError()
    }

    return this
  }
}
