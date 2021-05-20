import assert from "assert"

export const getEnvOrDefault = (envName: string, defaultValue: string): string => process.env[envName] ?? defaultValue

export const getEnvOrThrow = (envName: string): string => {
  const env = process.env[envName]
  assert(env, `Missing environment variable ${envName}`)
  return env
}

export const ENVIRONMENT = getEnvOrDefault("ENVIRONMENT", "local")
export const DATABASE_NAME = getEnvOrThrow("DATABASE_NAME")
export const DATABASE_USER = getEnvOrThrow("DATABASE_USER")
export const DATABASE_PASSWORD = getEnvOrThrow("DATABASE_PASSWORD")
export const DATABASE_HOST = getEnvOrThrow("DATABASE_HOST")
