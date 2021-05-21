import { IsDateString, IsEnum, IsString } from "class-validator"

import { Task } from "#/tasks/domain/entities/task"
import { Status } from "#/tasks/domain/entities/status"

export class UpdateTaskRequest {
  @IsString()
  public title!: string

  @IsString()
  public description!: string

  @IsEnum(Status)
  @IsString()
  public status!: Status

  @IsDateString()
  public dueDate!: Date

  public toDomain(): Task {
    return new Task(
      this.title,
      this.description,
      this.status,
      this.dueDate
    )
  }
}
