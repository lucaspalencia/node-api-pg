import { random, datatype } from "faker"

import { Task } from "#/tasks/domain/entities/task"
import { Status } from "#/tasks/domain/entities/status"

import { BaseBuilder } from "!tests/utils/base-builder"

export class TaskBuilder extends BaseBuilder<Task, TaskBuilder> {
  public constructor() {
    super(TaskBuilder)
  }

  protected buildDefault(): Task {
    return new Task(
      random.word(),
      random.words(),
      Status.toDo,
      datatype.datetime()
    )
  }
}
