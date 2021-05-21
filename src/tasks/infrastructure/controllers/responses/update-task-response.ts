import { classToPlain } from "class-transformer"

import { Task } from "#/tasks/domain/entities/task"

export class UpdateTaskResponse {
  public constructor(private readonly task: Task) {}

  public toPlain(): unknown {
    return classToPlain(this.task)
  }
}
