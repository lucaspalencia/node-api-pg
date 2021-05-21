import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Body, JsonController, Params, Put, Res } from "routing-controllers"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { Task } from "#/tasks/domain/entities/task"
import { UpdateTaskCommand } from "#/tasks/domain/commands/update-task-command"
import { Id } from "#/tasks/infrastructure/controllers/requests/id"
import { UpdateTaskRequest } from "#/tasks/infrastructure/controllers/requests/update-task-request"
import { tasksErrorsResponse } from "#/tasks/infrastructure/controllers/responses/tasks-errors-response"
import { CreateTaskResponse } from "#/tasks/infrastructure/controllers/responses/create-task-response"

@injectable()
@JsonController()
export class UpdateTaskController {
  public constructor(@inject(UpdateTaskCommand) private readonly command: UpdateTaskCommand) {}

  @Put("/tasks/:id")
  public async updateTask(
    @Body() req: UpdateTaskRequest,
    @Res() res: Response,
    @Params() params: Id
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)
    this.command.onTaskNotFoundError = this.onTaskNotFoundError(res)

    await this.command.execute(req.toDomain(), params.id)

    return res
  }

  private onSuccess(res: Response): (task: Task) => Promise<void> {
    return async (task: Task): Promise<void> => {
      res.status(StatusCodes.CREATED).send(new CreateTaskResponse(task).toPlain())
    }
  }

  private onTaskNotFoundError(res: Response): () => Promise<void> {
    return async (): Promise<void> => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        new ApplicationErrorResponse(tasksErrorsResponse.taskNotFound).toPlain()
      )
    }
  }
}
