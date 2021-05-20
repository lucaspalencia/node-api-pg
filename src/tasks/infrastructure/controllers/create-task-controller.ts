import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Body, JsonController, Params, Post, Res } from "routing-controllers"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { CreateTaskCommand } from "#/tasks/domain/commands/create-task-command"
import { UserId } from "#/tasks/infrastructure/controllers/requests/user-id"
import { CreateTaskRequest } from "#/tasks/infrastructure/controllers/requests/create-task-request"
import { createTaskErrors } from "#/tasks/infrastructure/controllers/responses/create-task-errors"

@injectable()
@JsonController()
export class CreateTaskController {
  public constructor(@inject(CreateTaskCommand) private readonly command: CreateTaskCommand) {}

  @Post("/tasks/:userId")
  public async createTask(
    @Body() req: CreateTaskRequest,
    @Res() res: Response,
    @Params() params: UserId
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)
    this.command.onError = this.onError(res)

    await this.command.execute(req.toDomain(), params.userId)

    return res
  }

  private onSuccess(res: Response): () => Promise<void> {
    return async (): Promise<void> => {
      res.status(StatusCodes.CREATED).send()
    }
  }

  private onError(res: Response): () => Promise<void> {
    return async (): Promise<void> => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        new ApplicationErrorResponse(createTaskErrors.userNotFound).toPlain()
      )
    }
  }
}
