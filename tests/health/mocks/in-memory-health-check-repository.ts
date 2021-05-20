import { HealthCheckRepository } from "#/health/domain/repositories/health-check-repository"

export class InMemoryHealthCheckRepository extends HealthCheckRepository {
  public constructor(private readonly result: boolean = false) {
    super()
  }

  public async check(): Promise<boolean> {
    return this.result
  }
}
