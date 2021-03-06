import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Body, JsonController, Params, Post, Res } from "routing-controllers"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { Task } from "#/tasks/domain/entities/task"
import { CreateTaskCommand } from "#/tasks/domain/commands/create-task-command"
import { Id } from "#/tasks/infrastructure/controllers/requests/id"
import { CreateTaskRequest } from "#/tasks/infrastructure/controllers/requests/create-task-request"
import { tasksErrorsResponse } from "#/tasks/infrastructure/controllers/responses/tasks-errors-response"
import { CreateTaskResponse } from "#/tasks/infrastructure/controllers/responses/create-task-response"

@injectable()
@JsonController()
export class CreateTaskController {
  public constructor(@inject(CreateTaskCommand) private readonly command: CreateTaskCommand) {}

  @Post("/users/:id/tasks")
  public async createTask(
    @Body() req: CreateTaskRequest,
    @Res() res: Response,
    @Params() params: Id
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)
    this.command.onUserNotFoundError = this.onUserNotFoundError(res)

    await this.command.execute(req.toDomain(), params.id)

    return res
  }

  private onSuccess(res: Response): (task: Task) => Promise<void> {
    return async (task: Task): Promise<void> => {
      res.status(StatusCodes.CREATED).send(new CreateTaskResponse(task).toPlain())
    }
  }

  private onUserNotFoundError(res: Response): () => Promise<void> {
    return async (): Promise<void> => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        new ApplicationErrorResponse(tasksErrorsResponse.userNotFound).toPlain()
      )
    }
  }
}
