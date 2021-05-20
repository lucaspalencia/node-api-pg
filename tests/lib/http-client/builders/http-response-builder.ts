import { datatype, random } from "faker"
import { StatusCodes } from "http-status-codes"

import { ResponseData } from "!tests/lib/http-client/response-data"
import { HttpResponse } from "!tests/lib/http-client/http-response"

export class HttpResponseBuilder {
  public static buildData(): ResponseData {
    return {
      id: datatype.uuid(),
      property1: random.word(),
      property2: random.word(),
    }
  }

  public build(data: ResponseData | ResponseData[], statusCode: number = StatusCodes.OK): HttpResponse {
    return {
      data,
      statusCode,
    }
  }
}
