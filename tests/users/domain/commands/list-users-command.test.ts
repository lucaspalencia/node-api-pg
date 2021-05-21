import sinon from "sinon"
import { expect } from "chai"

import { ListUsersCommand } from "#/users/domain/commands/list-users-command"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"
import { UserBuilder } from "!tests/users/builders/user-builder"

describe("ListUsersCommand", () => {
  it("should call onSuccess method with users list", async () => {
    // given
    const users = new UserBuilder().buildMany()
    const repository = new InMemoryUsersRepository().withUsers(users)
    const command = new ListUsersCommand(repository)
    const onSuccessFn = sinon.spy()

    command.onSuccess = onSuccessFn

    // when
    await command.execute()

    // then
    expect(onSuccessFn.called).to.be.true
  })
})
