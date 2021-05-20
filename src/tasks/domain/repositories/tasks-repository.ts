import { injectable } from "inversify"

import { Task } from "#/tasks/domain/entities/task"

@injectable()
export abstract class TasksRepository {
  abstract create(task: Task, userId: number): Promise<void>
}
