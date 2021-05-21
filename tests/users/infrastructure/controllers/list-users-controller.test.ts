import { expect } from "chai"
import { StatusCodes } from "http-status-codes"
import { createResponse } from "node-mocks-http"

import { ListUsersController } from "#/users/infrastructure/controllers/list-users-controller"
import { ListUsersResponse } from "#/users/infrastructure/controllers/responses/list-users-response"

import { ListUsersCommandStub } from "!tests/users/mocks/list-users-command-stub"
import { UserBuilder } from "!tests/users/builders/user-builder"

describe("ListUsersController", () => {
  it("should respond status OK with users list", async () => {
    // given
    const users = new UserBuilder().buildMany()
    const command = new ListUsersCommandStub().withSuccess(users)
    const controller = new ListUsersController(command)
    const response = createResponse()
    const getData = response["_getData"]

    // when
    await controller.listUsers(response)

    // then
    expect(response.statusCode).to.equal(StatusCodes.OK)
    expect(getData()).to.deep.equal(new ListUsersResponse(users).toPlain())
  })
})
