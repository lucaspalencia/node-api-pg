import { random, datatype } from "faker"

import { Status } from "#/tasks/domain/entities/status"
import { UpdateTaskRequest } from "#/tasks/infrastructure/controllers/requests/update-task-request"

import { BaseBuilder } from "!tests/utils/base-builder"

export class UpdateTaskRequestBuilder extends BaseBuilder<UpdateTaskRequest, UpdateTaskRequestBuilder> {
  public constructor() {
    super(UpdateTaskRequestBuilder)
  }

  protected buildDefault(): UpdateTaskRequest {
    const request = new UpdateTaskRequest()

    request.title = random.word()
    request.description = random.words()
    request.status = Status.toDo
    request.dueDate = datatype.datetime()

    return request
  }
}
