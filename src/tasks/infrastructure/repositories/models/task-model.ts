import { Model } from "objection"

import { Status } from "#/tasks/domain/entities/status"

export class TaskModel extends Model {
  public static tableName = "tasks"

  public readonly id!: number

  public userId!: number

  public title!: string

  public description!: string

  public status!: Status

  public dueDate!: Date

  public createdAt?: Date

  public updatedAt?: Date

  public $beforeInsert(): void {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public $beforeUpdate(): void {
    this.updatedAt = new Date()
  }
}
