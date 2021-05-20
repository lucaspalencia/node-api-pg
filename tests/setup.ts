import fs from "fs"
import path from "path"

import dotenv from "dotenv"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)

const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, "../", ".env.test")))

for (const key in envConfig) {
  process.env[key] = envConfig[key]
}
