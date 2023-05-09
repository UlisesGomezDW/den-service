import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import pieceworkers from "../data/pieceworkers.json"
import leaders from "../data/leaders.json"
import { createPromise } from "../utils/promise"

const router = Router()

router.use(authMiddleware)

router.get("/pieceworkers", async (req: Request, res: Response) => {
    try {
        const data = await createPromise(pieceworkers, 2000)
        res.json({
            ...response_success,
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/leaders", async (req: Request, res: Response) => {
    const data = await createPromise(leaders, 2000)
    try {
        res.json({
            ...response_success,
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/test", async (req: Request, res: Response) => {
    try {
        const key = req.query.key || ""
        const data = await createPromise({ users: ["JH", "CJ", "UJUM"] })

        console.log(key)
        res.json({
            ...response_success,
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
