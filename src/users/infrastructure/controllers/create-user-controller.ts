import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Body, JsonController, Post, Res } from "routing-controllers"

import { CreateUserCommand } from "#/users/domain/commands/create-user-comand"
import { CreateUserRequest } from "#/users/infrastructure/controllers/requests/create-user-request"

@injectable()
@JsonController()
export class CreateUserController {
  public constructor(@inject(CreateUserCommand) private readonly command: CreateUserCommand) {}

  @Post("/users")
  public async createUser(
    @Body() req: CreateUserRequest,
    @Res() res: Response
  ): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)

    await this.command.execute(req.toDomain())

    return res
  }

  private onSuccess(res: Response): () => Promise<void> {
    return async (): Promise<void> => {
      res.status(StatusCodes.CREATED).send()
    }
  }
}
