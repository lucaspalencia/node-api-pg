import { assert } from "chai"
import { getMetadataArgsStorage } from "routing-controllers"

import { diContainer } from "#/di-container"

describe("DI Container", () => {
  it("controllers", () => {
    // given
    const storage = getMetadataArgsStorage()
    const controllers: CallableFunction[] = storage.controllers.map((x) => x.target)

    // when
    // then
    for (const controller of controllers) {
      assert.isTrue(diContainer.get(controller) instanceof controller)
    }
  })
})
