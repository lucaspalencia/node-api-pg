import sinon from "sinon"
import { expect } from "chai"

import { CreateUserCommand } from "#/users/domain/commands/create-user-comand"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"
import { UserBuilder } from "!tests/users/builders/user-builder"

describe("CreateUserCommand", () => {
  it("should call onSuccess method when user was created by repository", async () => {
    // given
    const user = new UserBuilder().build()
    const repository = new InMemoryUsersRepository()
    const command = new CreateUserCommand(repository)
    const onSuccessFn = sinon.spy()

    command.onSuccess = onSuccessFn

    // when
    await command.execute(user)

    // then
    expect(onSuccessFn.called).to.be.true
  })
})
