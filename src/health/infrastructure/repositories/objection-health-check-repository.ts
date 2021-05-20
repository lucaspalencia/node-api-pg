import { Model } from "objection"

import { HealthCheckRepository } from "#/health/domain/repositories/health-check-repository"

export class ObjectionHealthCheckRepository extends HealthCheckRepository {
  public async check(): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      await Model.knex().raw("SELECT version()")
      return true
    } catch (_: unknown) {
      return false
    }
  }
}
