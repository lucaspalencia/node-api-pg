import sinon from "sinon"
import { expect } from "chai"
import { datatype } from "faker"

import { ListTasksByUserCommand } from "#/tasks/domain/commands/list-tasks-by-user-command"

import { InMemoryUsersRepository } from "!tests/users/mocks/in-memory-users-repository"
import { InMemoryTasksRepository } from "!tests/tasks/mocks/in-memory-tasks-repository"
import { TaskBuilder } from "!tests/tasks/builders/task-builder"
import { UserBuilder } from "!tests/users/builders/user-builder"

describe("ListTasksByUserCommand", () => {
  it("should call onUserNotFoundError method if user not found", async () => {
    // given
    const userId = datatype.number()
    const task = new TaskBuilder().build()
    const onSuccessFn = sinon.spy()
    const onUserNotFoundFn = sinon.spy()
    const command = new ListTasksByUserCommand(
      new InMemoryTasksRepository().withTask(task),
      new InMemoryUsersRepository()
    )

    command.onSuccess = onSuccessFn
    command.onUserNotFoundError = onUserNotFoundFn

    // when
    await command.execute(userId)

    // then
    expect(onUserNotFoundFn.called).to.be.true
    expect(onSuccessFn.called).to.be.false
  })

  it("should call onSuccess method with tasks list", async () => {
    // given
    const userId = datatype.number()
    const user = new UserBuilder().build()
    const tasks = new TaskBuilder().buildMany()
    const onSuccessFn = sinon.spy()
    const onUserNotFoundFn = sinon.spy()
    const command = new ListTasksByUserCommand(
      new InMemoryTasksRepository().withTasks(tasks),
      new InMemoryUsersRepository().withUser(user)
    )

    command.onSuccess = onSuccessFn
    command.onUserNotFoundError = onUserNotFoundFn

    // when
    await command.execute(userId)

    // then
    expect(onSuccessFn.calledWith(tasks)).to.be.true
    expect(onUserNotFoundFn.called).to.be.false
  })
})
