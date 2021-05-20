import path from "path"

/* eslint-disable import/first */
import moduleAlias from "module-alias"
moduleAlias.addAlias("#", path.join(__dirname, "src"))

import { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } from "#/settings"
/* eslint-enable import/first */

const connection = {
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
}

const knexConfig = {
  development: {
    client: "pg",
    connection: connection,
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: "pg",
    connection: connection,
    pool: {
      min: 2,
      max: 10,
    },
  },
}

export = knexConfig
