import { Task } from "#/tasks/domain/entities/task"
import { TaskModel } from "#/tasks/infrastructure/repositories/models/task-model"

export class TasksMapper {
  public static mapToTask(task: TaskModel): Task {
    return new Task(
      task.title,
      task.description,
      task.status,
      task.dueDate
    )
  }

  public static mapToTasks(tasks: TaskModel[]): Task[] {
    return tasks.map((task) => new Task(
      task.title,
      task.description,
      task.status,
      task.dueDate
    ))
  }
}
