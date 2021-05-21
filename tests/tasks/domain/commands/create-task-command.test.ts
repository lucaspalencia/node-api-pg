import sinon from "sinon"
import { expect } from "chai"
import { datatype } from "faker"

import { CreateTaskCommand } from "#/tasks/domain/commands/create-task-command"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"
import { InMemoryTasksRepository } from "!tests/tasks/mocks/in-memory-tasks-repository"
import { TaskBuilder } from "!tests/tasks/builders/task-builder"
import { UserBuilder } from "!tests/users/builders/user-builder"

describe("CreateTaskCommand", () => {
  it("should call onUserNotFoundError method if user not found", async () => {
    // given
    const userId = datatype.number()
    const task = new TaskBuilder().build()
    const onSuccessFn = sinon.spy()
    const onUserNotFoundFn = sinon.spy()
    const command = new CreateTaskCommand(
      new InMemoryTasksRepository().withTask(task),
      new InMemoryUsersRepository()
    )

    command.onSuccess = onSuccessFn
    command.onUserNotFoundError = onUserNotFoundFn

    // when
    await command.execute(task, userId)

    // then
    expect(onUserNotFoundFn.called).to.be.true
    expect(onSuccessFn.called).to.be.false
  })

  it("should call onSuccess method with task when created by repository", async () => {
    // given
    const userId = datatype.number()
    const user = new UserBuilder().build()
    const task = new TaskBuilder().build()
    const onSuccessFn = sinon.spy()
    const onUserNotFoundFn = sinon.spy()
    const command = new CreateTaskCommand(
      new InMemoryTasksRepository().withTask(task),
      new InMemoryUsersRepository().withUser(user)
    )

    command.onSuccess = onSuccessFn
    command.onUserNotFoundError = onUserNotFoundFn

    // when
    await command.execute(task, userId)

    // then
    expect(onSuccessFn.called).to.be.true
    expect(onUserNotFoundFn.called).to.be.false
  })
})
