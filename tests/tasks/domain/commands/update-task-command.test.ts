import sinon from "sinon"
import { expect } from "chai"
import { datatype } from "faker"

import { UpdateTaskCommand } from "#/tasks/domain/commands/update-task-command"

import { InMemoryTasksRepository } from "!tests/tasks/mocks/in-memory-tasks-repository"
import { TaskBuilder } from "!tests/tasks/builders/task-builder"

describe("UpdateTaskCommand", () => {
  it("should call onTaskNotFoundFn method if task not found", async () => {
    // given
    const userId = datatype.number()
    const task = new TaskBuilder().build()
    const repository = new InMemoryTasksRepository()
    const command = new UpdateTaskCommand(repository)
    const onSuccessFn = sinon.spy()
    const onTaskNotFoundFn = sinon.spy()

    command.onSuccess = onSuccessFn
    command.onTaskNotFoundError = onTaskNotFoundFn

    // when
    await command.execute(task, userId)

    // then
    expect(onTaskNotFoundFn.called).to.be.true
    expect(onSuccessFn.called).to.be.false
  })

  it("should call onSuccess method with task updated", async () => {
    // given
    const userId = datatype.number()
    const task = new TaskBuilder().build()
    const repository = new InMemoryTasksRepository().withTask(task)
    const command = new UpdateTaskCommand(repository)
    const onSuccessFn = sinon.spy()
    const onTaskNotFoundFn = sinon.spy()

    command.onSuccess = onSuccessFn
    command.onTaskNotFoundError = onTaskNotFoundFn

    // when
    await command.execute(task, userId)

    // then
    expect(onSuccessFn.called).to.be.true
    expect(onTaskNotFoundFn.called).to.be.false
  })
})
