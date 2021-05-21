import { expect } from "chai"
import { StatusCodes } from "http-status-codes"
import { createResponse } from "node-mocks-http"
import { datatype } from "faker"

import { ApplicationErrorResponse } from "#/common/infrastructure/controllers/responses/application-error-response"
import { ListTasksByUserController } from "#/tasks/infrastructure/controllers/list-tasks-by-user-controller"
import { ListTasksByUserResponse } from "#/tasks/infrastructure/controllers/responses/list-tasks-by-user-response"
import { tasksErrorsResponse } from "#/tasks/infrastructure/controllers/responses/tasks-errors-response"

import { ListTasksByUserCommandStub } from "!tests/tasks/mocks/list-tasks-by-user-command-stub"
import { TaskBuilder } from "!tests/tasks/builders/task-builder"

describe("ListTasksByUserController", () => {
  it("should respond status OK with tasks list", async () => {
    // given
    const tasks = new TaskBuilder().buildMany()
    const command = new ListTasksByUserCommandStub().withSuccess(tasks)
    const controller = new ListTasksByUserController(command)
    const response = createResponse()
    const getData = response["_getData"]
    const params = {
      id: datatype.number(),
    }

    // when
    await controller.listTasksByUser(response, params)

    // then
    expect(response.statusCode).to.equal(StatusCodes.OK)
    expect(getData()).to.deep.equal(new ListTasksByUserResponse(tasks).toPlain())
  })

  it("should respond status INTERNAL_SERVER_ERROR if user not found", async () => {
    // given
    const command = new ListTasksByUserCommandStub().withUserNotFoundError()
    const controller = new ListTasksByUserController(command)
    const response = createResponse()
    const getData = response["_getData"]
    const params = {
      id: datatype.number(),
    }

    // when
    await controller.listTasksByUser(response, params)

    // then
    expect(response.statusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(getData()).to.deep.equal(new ApplicationErrorResponse(tasksErrorsResponse.userNotFound).toPlain())
  })
})
