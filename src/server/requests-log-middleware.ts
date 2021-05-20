/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { NextFunction, Request, RequestHandler, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { Logger } from "#/lib/logger"

export class RequestsLogMiddleware {
  private static readonly logger = Logger.getLogger("RequestsLog")

  public static create(): RequestHandler {
    const middleware = new RequestsLogMiddleware()
    return (req: Request, res: Response, next: NextFunction): void => middleware.use(req, res, next)
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.logRequest(request)
    this.logResponse(request, response)
    next()
  }

  private logRequest(request: Request): void {
    const contentType = request.header("content-type") ?? ""
    let data = ""

    if (contentType.includes("application/json")) {
      data = JSON.stringify(request.body)
    }

    RequestsLogMiddleware.logger.info(`Request ${request.method.toUpperCase()} ${request.url}`, {
      url: request.url,
      method: request.method,
      headers: request.headers,
      params: request.params,
      data,
    })
  }

  private logResponse(request: Request, response: Response): void {
    const requestStartTime = Date.now()
    const defaultEnd: Function = response.end
    const defaultWrite: Function = response.write
    const chunks: Buffer[] = []

    response.write = function write(chunk: any): any {
      chunks.push(Buffer.from(chunk))
      return defaultWrite.apply(response, arguments)
    }

    response.end = function end(chunk: any): any {
      if (chunk) {
        chunks.push(Buffer.from(chunk))
      }

      const contentType = response.getHeader("content-type")
      const isJSON = typeof contentType === "string" ? contentType.includes("application/json") : false
      const elapsedTimeMillis = Date.now() - requestStartTime

      RequestsLogMiddleware.logger.log(
        response.statusCode >= StatusCodes.BAD_REQUEST ? "error" : "info",
        `Response ${request.method.toUpperCase()} ${request.url} ${response.statusCode}`,
        {
          url: request.url,
          method: request.method,
          elapsedTimeMillis,
          headers: { ...response.getHeaders() },
          status: response.statusCode,
          data: isJSON ? Buffer.concat(chunks).toString("utf8") : "",
        }
      )

      return defaultEnd.apply(response, arguments)
    }
  }
}
/* eslint-enable */
