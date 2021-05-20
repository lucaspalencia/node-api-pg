import { expect } from "chai"
import { StatusCodes } from "http-status-codes"

import { HttpClientResponse } from "#/lib/http-client"

import { ResponseData } from "!tests/lib/http-client/response-data"
import { HttpResponseBuilder } from "!tests/lib/http-client/builders/http-response-builder"

describe("Lib: HttpClient -> HttpClientResponse", () => {
  it("getRawData method", async () => {
    // given
    const data = HttpResponseBuilder.buildData()
    const httpResponse = new HttpResponseBuilder().build(data)

    // when
    const result = new HttpClientResponse(httpResponse.statusCode, httpResponse.data)

    // then
    expect(result.getRawData()).to.deep.equal(httpResponse.data)
  })

  it("getData method", async () => {
    // given
    const data = HttpResponseBuilder.buildData()
    const httpResponse = new HttpResponseBuilder().build(data)
    const response = new HttpClientResponse(httpResponse.statusCode, httpResponse.data)

    // when
    const result = await response.getData(ResponseData)

    // then
    expect(result).to.be.instanceOf(ResponseData)
    expect(result).to.deep.equal(httpResponse.data)
  })

  it("getArrayData method", async () => {
    // given
    const arrayData = [
      HttpResponseBuilder.buildData(),
      HttpResponseBuilder.buildData(),
    ]
    const httpResponse = new HttpResponseBuilder().build(arrayData, StatusCodes.INTERNAL_SERVER_ERROR)
    const response = new HttpClientResponse(httpResponse.statusCode, httpResponse.data)

    // when
    const result = await response.getArrayData(ResponseData)

    // then
    expect(result.length).to.be.greaterThan(1)
    expect(result).to.deep.equal(httpResponse.data)
  })

  it("hasStatus method true", async () => {
    // given
    const data = HttpResponseBuilder.buildData()
    const httpResponse = new HttpResponseBuilder().build(data)
    const response = new HttpClientResponse(httpResponse.statusCode, httpResponse.data)

    // when
    // then
    expect(response.hasStatus(StatusCodes.OK)).to.be.true
  })

  it("hasStatus method false", async () => {
    // given
    const data = HttpResponseBuilder.buildData()
    const httpResponse = new HttpResponseBuilder().build(data, StatusCodes.INTERNAL_SERVER_ERROR)
    const response = new HttpClientResponse(httpResponse.statusCode, httpResponse.data)

    // when
    // then
    expect(response.hasStatus(StatusCodes.OK)).to.be.false
  })

  it("hasStatusOrThrow method", () => {
    // given
    const data = HttpResponseBuilder.buildData()
    const httpResponse = new HttpResponseBuilder().build(data, StatusCodes.INTERNAL_SERVER_ERROR)
    const response = new HttpClientResponse(httpResponse.statusCode, httpResponse.data)

    // when
    // then
    expect(() => {
      response.hasStatusOrThrow(StatusCodes.OK)
    }).to.throw(`Request failed with status code ${response.statusCode}`)
  })
})
