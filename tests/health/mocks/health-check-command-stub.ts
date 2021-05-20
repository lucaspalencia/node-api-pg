import { noop } from "#/lib/typescript/noop"
import { HealthCheck } from "#/health/domain/entities/health-check"
import { HealthCheckCommand } from "#/health/domain/commands/health-check-command"

import { InMemoryHealthCheckRepository } from "!tests/health/mocks/in-memory-health-check-repository"

export class HealthCheckCommandStub extends HealthCheckCommand {
  private callback = noop

  public constructor() {
    super(new InMemoryHealthCheckRepository())
  }

  public async execute(): Promise<void> {
    await this.callback()
  }

  public withSuccess(healthCheck: HealthCheck): HealthCheckCommandStub {
    this.callback = async (): Promise<void> => {
      await this.onSuccess(healthCheck)
    }

    return this
  }
}
