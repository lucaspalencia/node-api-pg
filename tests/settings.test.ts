import { expect } from "chai"
import { random } from "faker"

import { getEnvOrDefault, getEnvOrThrow } from "#/settings"

describe("Settings", () => {
  it("getEnvOrDefault should return default value if env was not setted", () => {
    // given
    const envName = random.word()
    const defaultValue = random.word()

    // when
    const env = getEnvOrDefault(envName, defaultValue)

    // then
    expect(env).to.be.equal(defaultValue)
  })

  it("getEnvOrDefault should return value if env was setted", () => {
    // given
    const envName = random.word()
    const envValue = random.word()
    const defaultValue = random.word()

    process.env[envName] = envValue

    // when
    const env = getEnvOrDefault(envName, defaultValue)

    // then
    expect(env).to.be.equal(envValue)
  })

  it("getEnvOrThrow should throw error if env was no setted", () => {
    // given
    const envName = random.word()

    // when
    // then
    expect(() => {
      getEnvOrThrow(envName)
    }).to.throw(`Missing environment variable ${envName}`)
  })

  it("getEnvOrThrow should return value if env was setted", () => {
    // given
    const envName = random.word()
    const envValue = random.word()

    process.env[envName] = envValue

    // when
    const result = getEnvOrThrow(envName)

    // then
    expect(result).to.be.equal(envValue)
  })
})
