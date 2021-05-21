import { expect } from "chai"
import { StatusCodes } from "http-status-codes"
import { createResponse } from "node-mocks-http"
import { datatype } from "faker"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { UpdateTaskController } from "#/tasks/infrastructure/controllers/update-task-controller"
import { UpdateTaskResponse } from "#/tasks/infrastructure/controllers/responses/update-task-response"
import { tasksErrorsResponse } from "#/tasks/infrastructure/controllers/responses/tasks-errors-response"

import { UpdateTaskRequestBuilder } from "!tests/tasks/builders/update-task-request-builder"
import { UpdateTaskCommandStub } from "!tests/tasks/mocks/update-task-command-stub"
import { TaskBuilder } from "!tests/tasks/builders/task-builder"

describe("UpdateTaskController", () => {
  it("should respond status OK with task updated", async () => {
    // given
    const task = new TaskBuilder().build()
    const command = new UpdateTaskCommandStub().withSuccess(task)
    const controller = new UpdateTaskController(command)
    const request = new UpdateTaskRequestBuilder().build()
    const response = createResponse()
    const getData = response["_getData"]
    const params = {
      id: datatype.number(),
    }

    // when
    await controller.updateTask(request, response, params)

    // then
    expect(response.statusCode).to.equal(StatusCodes.CREATED)
    expect(getData()).to.deep.equal(new UpdateTaskResponse(task).toPlain())
  })

  it("should respond status INTERNAL_SERVER_ERROR if task not found", async () => {
    // given
    const command = new UpdateTaskCommandStub().withTaskNotFoundError()
    const controller = new UpdateTaskController(command)
    const request = new UpdateTaskRequestBuilder().build()
    const response = createResponse()
    const getData = response["_getData"]
    const params = {
      id: datatype.number(),
    }

    // when
    await controller.updateTask(request, response, params)

    // then
    expect(response.statusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(getData()).to.deep.equal(new ApplicationErrorResponse(tasksErrorsResponse.taskNotFound).toPlain())
  })
})
