import { Container } from "inversify"

import { CreateTaskCommand } from "#/tasks/domain/commands/create-task-command"
import { ListTasksByUserCommand } from "#/tasks/domain/commands/list-tasks-by-user-command"
import { UpdateTaskCommand } from "#/tasks/domain/commands/update-task-command"
import { CreateTaskController } from "#/tasks/infrastructure/controllers/create-task-controller"
import { ListTasksByUserController } from "#/tasks/infrastructure/controllers/list-tasks-by-user-controller"
import { UpdateTaskController } from "#/tasks/infrastructure/controllers/update-task-controller"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"
import { ObjectionTasksRepository } from "#/tasks/infrastructure/repositories/objection-tasks-repository"

const diContainer = new Container()

diContainer.bind(CreateTaskCommand).toSelf()
diContainer.bind(CreateTaskController).toSelf()
diContainer.bind(ListTasksByUserCommand).toSelf()
diContainer.bind(ListTasksByUserController).toSelf()
diContainer.bind(UpdateTaskCommand).toSelf()
diContainer.bind(UpdateTaskController).toSelf()
diContainer.bind(TasksRepository).to(ObjectionTasksRepository)

export { diContainer }
