import sinon from "sinon"
import { assert } from "chai"

import { HealthCheckCommand } from "#/health/domain/commands/health-check-command"

import { InMemoryHealthCheckRepository } from "!tests/health/mocks/in-memory-health-check-repository"

describe("HealthCheckCommand", () => {
  it("should call onSuccess method", async () => {
    // given
    const repository = new InMemoryHealthCheckRepository(true)
    const command = new HealthCheckCommand(repository)
    const onSuccessFn = sinon.spy()

    command.onSuccess = onSuccessFn

    // when
    await command.execute()

    // then
    assert.isTrue(onSuccessFn.called)
  })
})
