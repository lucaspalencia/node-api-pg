import { injectable } from "inversify"
import { ModelClass } from "objection"

import { Task } from "#/tasks/domain/entities/task"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"
import { TaskModel } from "#/tasks/infrastructure/repositories/models/task-model"
import { TasksMapper } from "#/tasks/infrastructure/repositories/mappers/tasks-mapper"

@injectable()
export class ObjectionTasksRepository extends TasksRepository {
  private readonly model: ModelClass<TaskModel> = TaskModel

  public async create(task: Task, userId: number): Promise<Task> {
    const taskCreated = await this.model.query().insert({
      userId,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    })

    return TasksMapper.mapToTask(taskCreated)
  }

  public async listByUser(userId: number): Promise<Task[]> {
    const tasks = await this.model.query()
      .where({ userId })
      .orderBy("dueDate", "DESC")

    return TasksMapper.mapToTasks(tasks)
  }

  public async findById(id: number): Promise<Task|undefined> {
    const task = await this.model.query().findById(id)

    if (task !== undefined) {
      return TasksMapper.mapToTask(task)
    }

    return undefined
  }

  public async update(task: Task, taskId: number): Promise<Task> {
    const taskUpdated = await this.model.query().patchAndFetchById(taskId, {
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    })

    return TasksMapper.mapToTask(taskUpdated)
  }
}
