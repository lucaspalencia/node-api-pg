import { Container } from "inversify"

import { HealthCheckCommand } from "#/health/domain/commands/health-check-command"
import { HealthCheckController } from "#/health/infrastructure/controllers/health-check-controller"
import { HealthCheckRepository } from "#/health/domain/repositories/health-check-repository"
import { ObjectionHealthCheckRepository } from "#/health/infrastructure/repositories/objection-health-check-repository"

const diContainer = new Container()

diContainer.bind(HealthCheckCommand).toSelf()
diContainer.bind(HealthCheckController).toSelf()
diContainer.bind(HealthCheckRepository).to(ObjectionHealthCheckRepository)

export { diContainer }
