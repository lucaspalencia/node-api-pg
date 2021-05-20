import { inject, injectable } from "inversify"
import { StatusCodes } from "http-status-codes"

import { noop } from "#/lib/typescript/noop"
import { HealthCheck } from "#/health/domain/entities/health-check"
import { HealthCheckRepository } from "#/health/domain/repositories/health-check-repository"

@injectable()
export class HealthCheckCommand {
  public onSuccess: (healthCheck: HealthCheck) => Promise<void> = noop

  public constructor(@inject(HealthCheckRepository) private readonly healthCheckRepository: HealthCheckRepository) {}

  public async execute(): Promise<void> {
    const databaseHealth = await this.healthCheckRepository.check()
    const healthCheck = new HealthCheck(StatusCodes.OK, new Date(), databaseHealth)

    return this.onSuccess(healthCheck)
  }
}
