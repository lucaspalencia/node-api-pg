import { injectable } from "inversify"

import { Task } from "#/tasks/domain/entities/task"

@injectable()
export abstract class TasksRepository {
  abstract create(task: Task, userId: number): Promise<Task>

  abstract update(task: Task, taskId: number): Promise<Task>

  abstract listByUser(userId: number): Promise<Task[]>

  abstract findById(id: number): Promise<Task|undefined>
}
