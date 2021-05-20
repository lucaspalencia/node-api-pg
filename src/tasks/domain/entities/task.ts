import { Status } from "#/tasks/domain/entities/status"

export class Task {
  public constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly status: Status,
    public readonly dueDate: Date,
    public readonly createdAt?: Date,
  ) {}
}
