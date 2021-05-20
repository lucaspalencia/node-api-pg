import { datatype } from "faker"

import { HealthCheck } from "#/health/domain/entities/health-check"

import { BaseBuilder } from "!tests/utils/base-builder"

export class HealthCheckBuilder extends BaseBuilder<HealthCheck, HealthCheckBuilder> {
  public constructor() {
    super(HealthCheckBuilder)
  }

  protected buildDefault(): HealthCheck {
    return new HealthCheck(
      datatype.number(),
      datatype.datetime(),
      datatype.boolean()
    )
  }
}
