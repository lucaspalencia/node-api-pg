import { StatusCodes } from "http-status-codes"
import nock from "nock"

import { ResponseData } from "!tests/lib/http-client/response-data"

export const FAKE_URL = "http://fakeurl.com"

export class NockSetup {
  public constructor(private readonly url: string) {}

  public successful(data: ResponseData | ResponseData[]): void {
    nock(FAKE_URL)
      .get(this.url)
      .reply(StatusCodes.OK, data)
  }

  public internalServerError(): void {
    nock(FAKE_URL)
      .get(this.url)
      .reply(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
