import { inject, injectable } from "inversify"

import { noop } from "#/lib/typescript/noop"
import { Task } from "#/tasks/domain/entities/task"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"
import { UsersRepository } from "#/users/domain/repositories/users-repository"

@injectable()
export class ListTasksByUserCommand {
  public onSuccess: (tasks: Task[]) => Promise<void> = noop

  public onUserNotFoundError: () => Promise<void> = noop

  public constructor(
    @inject(TasksRepository) private readonly repository: TasksRepository,
    @inject(UsersRepository) private readonly usersRepository: UsersRepository
  ) {}

  public async execute(userId: number): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return this.onUserNotFoundError()
    }

    const tasks = await this.repository.listByUser(userId)

    return this.onSuccess(tasks)
  }
}
