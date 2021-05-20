import nock from "nock"
import { expect } from "chai"
import { StatusCodes } from "http-status-codes"

import { HttpClient } from "#/lib/http-client"

import { FAKE_URL, NockSetup } from "!tests/lib/http-client/nock-setup"
import { HttpResponseBuilder } from "!tests/lib/http-client/builders/http-response-builder"

describe("Lib: HttpClient", () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it("should return response when request successfully", async () => {
    const data = HttpResponseBuilder.buildData()
    const httpResponse = new HttpResponseBuilder().build(data)

    new NockSetup("/test").successful(httpResponse.data)

    const httpClient = new HttpClient(FAKE_URL)

    const result = await httpClient.request({
      url: "/test",
      method: "get",
    })

    expect(result).to.deep.equal(httpResponse)
  })

  it("should throw error when request failed", async () => {
    new NockSetup("/test").internalServerError()

    const httpClient = new HttpClient(FAKE_URL)

    await expect(
      httpClient.request({
        url: "/test",
        method: "get",
      })
    ).to.be.rejectedWith(`Request failed with status code ${StatusCodes.INTERNAL_SERVER_ERROR}`)
  })
})
