import { expect } from "chai"
import { createResponse } from "node-mocks-http"
import { StatusCodes } from "http-status-codes"

import { HealthCheckController } from "#/health/infrastructure/controllers/health-check-controller"
import { HealthCheckResponse } from "#/health/infrastructure/controllers/responses/health-check-response"

import { HealthCheckCommandStub } from "!tests/health/mocks/health-check-command-stub"
import { HealthCheckBuilder } from "!tests/health/builders/health-check-builder"

describe("HealthCheckController", () => {
  it("should respond status OK with data", async () => {
    // given
    const healthCheck = new HealthCheckBuilder().build()
    const command = new HealthCheckCommandStub().withSuccess(healthCheck)
    const controller = new HealthCheckController(command)
    const response = createResponse()
    const getData = response["_getData"]

    // when
    await controller.healthCheck(response)

    // then
    expect(response.statusCode).to.equal(StatusCodes.OK)
    expect(getData()).to.deep.equal(new HealthCheckResponse(healthCheck).toPlain())
  })
})
