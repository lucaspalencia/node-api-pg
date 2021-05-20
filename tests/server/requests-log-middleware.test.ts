import { expect } from "chai"
import { createRequest, createResponse } from "node-mocks-http"
import sinon from "sinon"

import { RequestsLogMiddleware } from "#/server/requests-log-middleware"

describe("RequestsLogMiddleware", () => {
  it("create method should return a function", () => {
    // given
    const middleware = RequestsLogMiddleware.create()

    // when
    // then
    expect(middleware).to.be.a("function")
  })

  it("should call next callback", () => {
    // given
    const request = createRequest({
      headers: {
        "content-type": "application/json",
      },
    })
    const response = createResponse()
    const next = sinon.spy()
    const middleware = new RequestsLogMiddleware()

    // when
    middleware.use(request, response, next)

    // then
    expect(next.called).to.be.true
  })
})
