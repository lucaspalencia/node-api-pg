import { classToPlain, Expose } from "class-transformer"

interface Error {
  code: string
  message: string
}

export class ApplicationErrorResponse {
  @Expose()
  public readonly code: string

  @Expose()
  public readonly message: string

  public constructor(error: Error) {
    this.code = error.code
    this.message = error.message
  }

  public toPlain(): unknown {
    return classToPlain(this)
  }
}
