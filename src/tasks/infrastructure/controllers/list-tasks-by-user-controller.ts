import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { JsonController, Params, Get, Res } from "routing-controllers"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { Task } from "#/tasks/domain/entities/task"
import { ListTasksByUserCommand } from "#/tasks/domain/commands/list-tasks-by-user-command"
import { UserId } from "#/tasks/infrastructure/controllers/requests/user-id"
import { createTaskErrors } from "#/tasks/infrastructure/controllers/responses/create-task-errors"
import { ListTasksByUserResponse } from "#/tasks/infrastructure/controllers/responses/list-tasks-by-user-response"

@injectable()
@JsonController()
export class ListTasksByUserController {
  public constructor(@inject(ListTasksByUserCommand) private readonly command: ListTasksByUserCommand) {}

  @Get("/tasks/:userId")
  public async listTasksByUser(
    @Res() res: Response,
    @Params() params: UserId
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)
    this.command.onUserNotFoundError = this.onUserNotFoundError(res)

    await this.command.execute(params.userId)

    return res
  }

  private onSuccess(res: Response): (tasks: Task[]) => Promise<void> {
    return async (tasks: Task[]): Promise<void> => {
      res.status(StatusCodes.OK).send(new ListTasksByUserResponse(tasks).toPlain())
    }
  }

  private onUserNotFoundError(res: Response): () => Promise<void> {
    return async (): Promise<void> => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        new ApplicationErrorResponse(createTaskErrors.userNotFound).toPlain()
      )
    }
  }
}
