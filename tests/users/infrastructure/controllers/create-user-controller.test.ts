import { expect } from "chai"
import { StatusCodes } from "http-status-codes"
import { createResponse } from "node-mocks-http"

import { CreateUserController } from "#/users/infrastructure/controllers/create-user-controller"

import { CreateUserRequestBuilder } from "!tests/users/builders/create-user-request-builder"
import { CreateUserCommandStub } from "!tests/users/mocks/create-user-command-stub"

describe("CreateUserController", () => {
  it("should respond status CREATED", async () => {
    // given
    const command = new CreateUserCommandStub().withSuccess()
    const controller = new CreateUserController(command)
    const request = new CreateUserRequestBuilder().build()
    const response = createResponse()

    // when
    await controller.createUser(request, response)

    // then
    expect(response.statusCode).to.equal(StatusCodes.CREATED)
  })
})
