import { classToPlain } from "class-transformer"

import { HealthCheck } from "#/health/domain/entities/health-check"

export class HealthCheckResponse {
  public constructor(private readonly healthCheck: HealthCheck) {}

  public toPlain(): unknown {
    return classToPlain(this.healthCheck)
  }
}
