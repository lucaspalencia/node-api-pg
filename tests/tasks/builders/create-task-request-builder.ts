import { random, datatype } from "faker"

import { Status } from "#/tasks/domain/entities/status"
import { CreateTaskRequest } from "#/tasks/infrastructure/controllers/requests/create-task-request"

import { BaseBuilder } from "!tests/utils/base-builder"

export class CreateTaskRequestBuilder extends BaseBuilder<CreateTaskRequest, CreateTaskRequestBuilder> {
  public constructor() {
    super(CreateTaskRequestBuilder)
  }

  protected buildDefault(): CreateTaskRequest {
    const request = new CreateTaskRequest()

    request.title = random.word()
    request.description = random.words()
    request.status = Status.toDo
    request.dueDate = datatype.datetime()

    return request
  }
}
