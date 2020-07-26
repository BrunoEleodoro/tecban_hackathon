import express from "express"
import routes from "./routes"
import path from "path"

const app = express()

app.use("/assets", express.static(path.resolve(__dirname, '..', 'assets')));
app.use(routes)

export default app