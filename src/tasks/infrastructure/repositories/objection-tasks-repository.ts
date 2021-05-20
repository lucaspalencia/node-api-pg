import { injectable } from "inversify"
import { ModelClass } from "objection"

import { Task } from "#/tasks/domain/entities/task"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"
import { TaskModel } from "#/tasks/infrastructure/repositories/models/task-model"

@injectable()
export class ObjectionTasksRepository extends TasksRepository {
  private readonly model: ModelClass<TaskModel> = TaskModel

  public async create(task: Task, userId: number): Promise<void> {
    await this.model.query().insert({
      userId,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    })
  }
}
