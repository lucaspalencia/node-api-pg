import { ENVIRONMENT } from "#/settings"
import { Severity } from "#/lib/logger/severity"
import { LoggerTransportersFactory } from "#/lib/logger/logger-transporters-factory"
import { AsyncStorage } from "#/lib/async-storage"

export class Logger {
  private static readonly winston = new LoggerTransportersFactory().createWinstonInstance()

  private static readonly context = AsyncStorage.create("logger")

  private constructor(public readonly name: string) { }

  public static getLogger(name = "main"): Logger {
    return new Logger(name)
  }

  public static runInContext(fn: (...args: unknown[]) => void): void {
    Logger.context.run(fn)
  }

  public static setCorrelationId(id: string): void {
    Logger.context.set("correlationId", id)
  }

  public static setRequestId(id: string): void {
    Logger.context.set("requestId", id)
  }

  public info(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log("info", message, meta)
  }

  public error(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log("error", message, meta)
  }

  public log(severity: Severity, message: string, meta: { [key: string]: unknown }): void {
    try {
      Logger.winston.log(severity, message, {
        name: this.name,
        correlationId: Logger.context.get("correlationId"),
        requestId: Logger.context.get("requestId"),
        environment: ENVIRONMENT,
        severity,
        meta,
      })
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error("Failed to write logs", error)
    }
  }
}
