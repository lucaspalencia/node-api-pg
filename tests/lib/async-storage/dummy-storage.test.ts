import sinon from "sinon"
import { expect } from "chai"

import { DummyStorage } from "#/lib/async-storage/dummy-storage"

describe("Lib: AsyncStorage -> DummyStorage", () => {
  it("run method", () => {
    // given
    const dummyStorage = new DummyStorage()
    const fn = sinon.spy()

    // when
    dummyStorage.run(fn)

    // then
    expect(fn.called).to.be.true
  })

  it("set and get methods", () => {
    // given
    const key = "keyTest"
    const value = "keyValue"
    const dummyStorage = new DummyStorage()

    // when
    dummyStorage.set(key, value)

    // then
    expect(dummyStorage.get(key)).to.be.equal(value)
  })
})
