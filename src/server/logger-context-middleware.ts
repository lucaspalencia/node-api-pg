import { v4 as uuid } from "uuid"
import { NextFunction, Request, RequestHandler, Response } from "express"

import { Logger } from "#/lib/logger"

export class LoggerContextMiddleware {
  public static create(): RequestHandler {
    const middleware = new LoggerContextMiddleware()
    return (req: Request, res: Response, next: NextFunction): void => middleware.use(req, res, next)
  }

  public use(req: Request, _: Response, next: NextFunction): void {
    Logger.runInContext(() => {
      Logger.setCorrelationId(this.getCorrelationId(req))
      Logger.setRequestId(this.getRequestId())
      next()
    })
  }

  private getCorrelationId(req: Request): string {
    const correlationId: unknown = req.headers["x-correlation-id"]
    return typeof correlationId === "string" ? correlationId : uuid()
  }

  private getRequestId(): string {
    return uuid()
  }
}
