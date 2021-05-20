import { Container } from "inversify"

import { CreateTaskCommand } from "#/tasks/domain/commands/create-task-command"
import { CreateTaskController } from "#/tasks/infrastructure/controllers/create-task-controller"
import { TasksRepository } from "#/tasks/domain/repositories/tasks-repository"
import { ObjectionTasksRepository } from "#/tasks/infrastructure/repositories/objection-tasks-repository"

const diContainer = new Container()

diContainer.bind(CreateTaskCommand).toSelf()
diContainer.bind(CreateTaskController).toSelf()
diContainer.bind(TasksRepository).to(ObjectionTasksRepository)

export { diContainer }
