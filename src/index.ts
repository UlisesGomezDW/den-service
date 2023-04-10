import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import http from "http"

dotenv.config()

import { login } from "./routes/auth"
import proyectsRouter from "./routes/proyects"

const app: Express = express()
const apiRouter = express.Router()
const server = new http.Server(app)

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running! 🐶")
})
app.use("/api", apiRouter)
app.get("/ping", (_, res) => {
    res.json({ pong: true }).status(301)
})
apiRouter.use("/auth", login)
apiRouter.use("/proyects", proyectsRouter)

const host = process.env.HOST || "0.0.0.0"
const port = Number(process.env.PORT) || 5000

server.listen(port, host, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export { server }
