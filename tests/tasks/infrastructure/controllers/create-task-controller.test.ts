import { expect } from "chai"
import { StatusCodes } from "http-status-codes"
import { createResponse } from "node-mocks-http"
import { datatype } from "faker"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { CreateTaskController } from "#/tasks/infrastructure/controllers/create-task-controller"
import { CreateTaskResponse } from "#/tasks/infrastructure/controllers/responses/create-task-response"
import { tasksErrorsResponse } from "#/tasks/infrastructure/controllers/responses/tasks-errors-response"

import { CreateTaskRequestBuilder } from "!tests/tasks/builders/create-task-request-builder"
import { CreateTaskCommandStub } from "!tests/tasks/mocks/create-task-command-stub"
import { TaskBuilder } from "!tests/tasks/builders/task-builder"

describe("CreateTaskController", () => {
  it("should respond status CREATED with task", async () => {
    // given
    const task = new TaskBuilder().build()
    const command = new CreateTaskCommandStub().withSuccess(task)
    const controller = new CreateTaskController(command)
    const request = new CreateTaskRequestBuilder().build()
    const response = createResponse()
    const getData = response["_getData"]
    const params = {
      id: datatype.number(),
    }

    // when
    await controller.createTask(request, response, params)

    // then
    expect(response.statusCode).to.equal(StatusCodes.CREATED)
    expect(getData()).to.deep.equal(new CreateTaskResponse(task).toPlain())
  })

  it("should respond status INTERNAL_SERVER_ERROR if user not found", async () => {
    // given
    const command = new CreateTaskCommandStub().withUserNotFoundError()
    const controller = new CreateTaskController(command)
    const request = new CreateTaskRequestBuilder().build()
    const response = createResponse()
    const getData = response["_getData"]
    const params = {
      id: datatype.number(),
    }

    // when
    await controller.createTask(request, response, params)

    // then
    expect(response.statusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(getData()).to.deep.equal(new ApplicationErrorResponse(tasksErrorsResponse.userNotFound).toPlain())
  })
})
