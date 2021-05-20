import { injectable } from "inversify"

@injectable()
export abstract class HealthCheckRepository {
  abstract check(): Promise<boolean>
}
