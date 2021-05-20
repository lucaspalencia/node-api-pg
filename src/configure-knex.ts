import Knex from "knex"
import { Model } from "objection"

// eslint-disable-next-line no-restricted-imports
import knexConfig from "../knexfile"

if (process.env.NODE_ENV === "production") {
  Model.knex(Knex(knexConfig.production))
} else {
  Model.knex(Knex(knexConfig.development))
}
