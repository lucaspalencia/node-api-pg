/* eslint-disable import/first */
import moduleAlias from "module-alias"
moduleAlias.addAlias("#", __dirname)

import "reflect-metadata"

import "#/configure-knex"
import { server } from "#/server"
/* eslint-enable import/first */

const port = process.env.PORT ?? "3000"

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server running on port ${port}`)
})
