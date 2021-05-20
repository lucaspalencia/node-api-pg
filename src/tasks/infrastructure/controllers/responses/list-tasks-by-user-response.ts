import { classToPlain } from "class-transformer"

import { Task } from "#/tasks/domain/entities/task"

export class ListTasksByUserResponse {
  public constructor(private readonly tasks: Task[]) {}

  public toPlain(): unknown {
    return classToPlain(this.tasks)
  }
}
