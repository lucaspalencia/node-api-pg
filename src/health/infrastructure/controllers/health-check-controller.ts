import { StatusCodes } from "http-status-codes"
import { Response } from "express"
import { inject, injectable } from "inversify"
import { Get, JsonController, Res } from "routing-controllers"

import { HealthCheckCommand } from "#/health/domain/commands/health-check-command"
import { HealthCheck } from "#/health/domain/entities/health-check"
import { HealthCheckResponse } from "#/health/infrastructure/controllers/responses/health-check-response"

@injectable()
@JsonController()
export class HealthCheckController {
  public constructor(@inject(HealthCheckCommand) private readonly command: HealthCheckCommand) {}

  @Get("/health")
  public async healthCheck(@Res() res: Response): Promise<Response> {
    this.command.onSuccess = this.onSuccess(res)

    await this.command.execute()

    return res
  }

  private onSuccess(res: Response): (healthCheck: HealthCheck) => Promise<void> {
    return async (healthCheck: HealthCheck): Promise<void> => {
      res.status(StatusCodes.OK).send(new HealthCheckResponse(healthCheck).toPlain())
    }
  }
}
