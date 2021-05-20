import express from "express"
import helmet from "helmet"
import bodyParser from "body-parser"
import { useContainer, useExpressServer } from "routing-controllers"

import { LoggerContextMiddleware } from "#/server/logger-context-middleware"
import { RequestsLogMiddleware } from "#/server/requests-log-middleware"
import { diContainer } from "#/di-container"

const server = express()

server.use(helmet())
server.use(bodyParser.json())
server.use(LoggerContextMiddleware.create())
server.use(RequestsLogMiddleware.create())

useContainer(diContainer)

useExpressServer(server)

export { server }
