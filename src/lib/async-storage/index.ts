import { createNamespace } from "cls-hooked"

import { ENVIRONMENT } from "#/settings"
import { Storage } from "#/lib/async-storage/storage"
import { DummyStorage } from "#/lib/async-storage/dummy-storage"

export class AsyncStorage {
  public static create(name = "default"): Storage {
    if (ENVIRONMENT === "test") {
      return new DummyStorage()
    }

    return createNamespace(name)
  }
}
