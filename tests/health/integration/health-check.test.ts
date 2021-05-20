import { default as supertest } from "supertest"
import { expect } from "chai"
import { StatusCodes } from "http-status-codes"

import { server } from "#/server"

describe("Integration: Health", () => {
  it("healthCheck", async () => {
    // given
    const api = supertest(server)

    // when
    const { statusCode, body } = await api.get("/health")

    // then
    expect(statusCode).to.be.equal(StatusCodes.OK)
    expect(body.status).to.be.equal(StatusCodes.OK)
  })
})
