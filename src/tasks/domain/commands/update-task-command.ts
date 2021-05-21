import { inject, injectable } from "inversify"

import { noop } from "#/lib/typescript/noop"
import { Task } from "#/tasks/domain/entities/task"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"

@injectable()
export class UpdateTaskCommand {
  public onSuccess: (task: Task) => Promise<void> = noop

  public onTaskNotFoundError: () => Promise<void> = noop

  public constructor(
    @inject(TasksRepository) private readonly repository: TasksRepository,
  ) {}

  public async execute(task: Task, taskId: number): Promise<void> {
    const taskFound = await this.repository.findById(taskId)

    if (!taskFound) {
      return this.onTaskNotFoundError()
    }

    const taskUpdated = await this.repository.update(task, taskId)

    return this.onSuccess(taskUpdated)
  }
}
