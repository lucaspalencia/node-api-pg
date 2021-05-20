import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { JsonController, Get, Res } from "routing-controllers"

import { User } from "#/users/domain/entities/user"
import { ListUsersCommand } from "#/users/domain/commands/list-users-command"
import { ListUsersResponse } from "#/users/infrastructure/controllers/responses/list-users-response"

@injectable()
@JsonController()
export class ListUsersController {
  public constructor(@inject(ListUsersCommand) private readonly command: ListUsersCommand) {}

  @Get("/users")
  public async listUsers(@Res() res: Response): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)

    await this.command.execute()

    return res
  }

  private onSuccess(res: Response): (users: User[]) => Promise<void> {
    return async (users: User[]): Promise<void> => {
      res.status(StatusCodes.OK).send(new ListUsersResponse(users).toPlain())
    }
  }
}
