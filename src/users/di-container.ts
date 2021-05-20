import { Container } from "inversify"

import { CreateUserCommand } from "#/users/domain/commands/create-user-comand"
import { CreateUserController } from "#/users/infrastructure/controllers/create-user-controller"
import { ListUsersCommand } from "#/users/domain/commands/list-users-command"
import { ListUsersController } from "#/users/infrastructure/controllers/list-users-controller"
import { UsersRepository } from "#/users/domain/repositories/users-repository"
import { ObjectionUsersRepository } from "#/users/infrastructure/repositories/objection-users-repository"

const diContainer = new Container()

diContainer.bind(CreateUserCommand).toSelf()
diContainer.bind(CreateUserController).toSelf()
diContainer.bind(ListUsersCommand).toSelf()
diContainer.bind(ListUsersController).toSelf()
diContainer.bind(UsersRepository).to(ObjectionUsersRepository)

export { diContainer }
