import { Task } from "#/tasks/domain/entities/task"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"

export class InMemoryTasksRepository extends TasksRepository {
  public task!: Task

  public tasks!: Task[]

  public async create(): Promise<Task> {
    return this.task
  }

  public async update(): Promise<Task> {
    return this.task
  }

  public async listByUser(): Promise<Task[]> {
    return this.tasks
  }

  public async findById(): Promise<Task|undefined> {
    return this.task
  }

  public withTask(task: Task): InMemoryTasksRepository {
    this.task = task
    return this
  }

  public withTasks(tasks: Task[]): InMemoryTasksRepository {
    this.tasks = tasks
    return this
  }
}
