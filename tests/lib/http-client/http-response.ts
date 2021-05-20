import { ResponseData } from "!tests/lib/http-client/response-data"

export interface HttpResponse {
  data: ResponseData | ResponseData[],
  statusCode: number
}
