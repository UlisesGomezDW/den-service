import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import pieceworkers from "../data/pieceworkers.json"
import leaders from "../data/leaders.json"

const router = Router()

router.use(authMiddleware)

router.get("/pieceworkers", (req: Request, res: Response) => {
    try {
        res.json({
            ...response_success,
            data: pieceworkers,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/leaders", (req: Request, res: Response) => {
    try {
        res.json({
            ...response_success,
            data: leaders,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
