import winston from "winston"
import { Format } from "logform"

import { ENVIRONMENT } from "#/settings"
import { Severity } from "#/lib/logger/severity"

export class LoggerTransportersFactory {
  private readonly jsonLogSpace: number = 4

  public createWinstonInstance(): winston.Logger {
    const logger = winston.createLogger()

    this.initializeTransporters(logger)

    return logger
  }

  private initializeTransporters(logger: winston.Logger): void {
    logger.add(this.createConsoleWinstonTransport(
      "info",
      this.getFormat(),
    ))
  }

  private getFormat(): Format {
    if (ENVIRONMENT === "local") {
      return this.consoleFormat()
    }

    return winston.format.combine()
  }

  private createConsoleWinstonTransport(level: Severity, format: Format):
    winston.transports.ConsoleTransportInstance {
    return new winston.transports.Console({
      level,
      format,
      silent: ENVIRONMENT === "test",
    })
  }

  private consoleFormat(): Format {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((log) => [
        log.timestamp, `[${log.level}]`, log.message, JSON.stringify(log, null, this.jsonLogSpace),
      ].join(" "))
    )
  }
}
