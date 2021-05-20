import { Knex } from "knex"

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary()
    table.string("email").notNullable()
    table.string("name").notNullable()
    table.dateTime("createdAt").notNullable()
    table.dateTime("updatedAt").notNullable()
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists("users")
}
