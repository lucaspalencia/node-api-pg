import { Container, interfaces } from "inversify"

import { diContainer as HealthDiContainer } from "#/health/di-container"
import { diContainer as UsersDiContainer } from "#/users/di-container"

const appContainers: interfaces.Container[] = [
  HealthDiContainer,
  UsersDiContainer,
]

const diContainer = appContainers.reduce(
  (accContainer, currentContainer) =>
    Container.merge(accContainer, currentContainer),
  new Container(),
)

export { diContainer }
