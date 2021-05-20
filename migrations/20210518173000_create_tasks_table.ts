import { Knex } from "knex"

export const up = async (knex: Knex): Promise<void> => {
  const status = ["to_do", "in_progress", "on_review", "ready_for_release", "done"]

  await knex.schema.createTable("tasks", (table: Knex.TableBuilder) => {
    table.increments("id").primary()
    table.string("title").notNullable()
    table.text("description")
    table.enu("status", status)
    table.dateTime("dueDate").notNullable()
    table.integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index()
    table.dateTime("createdAt").notNullable()
    table.dateTime("updatedAt").notNullable()
  })
}

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists("tasks")
}
