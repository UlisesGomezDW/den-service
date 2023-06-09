import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import http from "http"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"

dotenv.config()

import authRouter from "./routes/auth"
import proyectsRouter from "./routes/proyects"
import planeRouter from "./routes/plane"
import usersRouter from "./routes/users"
import plotsRouter from "./routes/plots"
import checklistRouter from "./routes/checklist"
import incidentsRouter from "./routes/incidents"
import pieceworkerRouter from "./routes/pieceworker"

const app: Express = express()
const apiRouter = express.Router()
const server = new http.Server(app)

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }))

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running! 🐶")
})
app.use("/api", apiRouter)
app.get("/ping", (_, res) => {
    res.json({ pong: true }).status(301)
})
apiRouter.use("/auth", authRouter)
apiRouter.use("/proyects", proyectsRouter)
apiRouter.use("/plane", planeRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/plots", plotsRouter)
apiRouter.use("/checklist", checklistRouter)
apiRouter.use("/incidents", incidentsRouter)
apiRouter.use("/pieceworker", pieceworkerRouter)

const host = process.env.HOST || "0.0.0.0"
const port = Number(process.env.PORT) || 5000

server.listen(port, host, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export { server }
