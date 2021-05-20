import { expect } from "chai"

import { AsyncStorage } from "#/lib/async-storage"
import { DummyStorage } from "#/lib/async-storage/dummy-storage"

describe("Lib: AsyncStorage", () => {
  it("should return DummyStorage on test environment", () => {
    // given
    const keyContext = "keyContext"

    // when
    const context = AsyncStorage.create(keyContext)

    // then
    expect(context).to.be.instanceOf(DummyStorage)
  })
})
