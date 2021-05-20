import assert from "assert"

import { plainToClass, ClassConstructor } from "class-transformer"
import { validateOrReject } from "class-validator"

export class HttpClientResponse {
  public constructor(
    public readonly statusCode: number,
    private readonly data: unknown,
  ) {}

  public hasStatus(status: number): boolean {
    return this.statusCode === status
  }

  public hasStatusOrThrow(status: number): void {
    if (this.statusCode !== status) {
      throw new Error(`Request failed with status code ${this.statusCode}`)
    }
  }

  public async getData<T>(dataType: ClassConstructor<T>): Promise<T> {
    const data = plainToClass(dataType, this.data)
    await validateOrReject(data)
    return data
  }

  public async getArrayData<T>(dataType: ClassConstructor<T>): Promise<T[]> {
    assert(Array.isArray(this.data), "Expected the data content to be an array")

    const data = plainToClass(dataType, this.data)
    await validateOrReject(data)
    return data
  }

  public getRawData(): unknown {
    return this.data
  }
}
