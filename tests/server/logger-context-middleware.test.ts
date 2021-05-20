import { expect } from "chai"
import { createRequest, createResponse } from "node-mocks-http"
import sinon from "sinon"

import { LoggerContextMiddleware } from "#/server/logger-context-middleware"

describe("LoggerContextMiddleware", () => {
  it("create method should return a function", () => {
    // given
    const middleware = LoggerContextMiddleware.create()

    // when
    // then
    expect(middleware).to.be.a("function")
  })

  it("should call next callback without x-correlation-id on request header", () => {
    // given
    const request = createRequest()
    const response = createResponse()
    const next = sinon.spy()
    const middleware = new LoggerContextMiddleware()

    // when
    middleware.use(request, response, next)

    // then
    expect(next.called).to.be.true
  })

  it("should call next callback with x-correlation-id on request header", () => {
    // given
    const request = createRequest({
      headers: {
        "x-correlation-id": "dsadadadadad",
      },
    })
    const response = createResponse()
    const next = sinon.spy()
    const middleware = new LoggerContextMiddleware()

    // when
    middleware.use(request, response, next)

    // then
    expect(next.called).to.be.true
  })
})
