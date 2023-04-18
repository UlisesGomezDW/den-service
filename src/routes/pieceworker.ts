import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"

const router = Router()

router.use(authMiddleware)

router.post("/validation", (req: Request, res: Response) => {
    const { lead = "", pieceworker = [], photos = [], comments = "", taskId = "" } = req.body
    try {
        console.log(req.body)
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                message: "success data",
                data: {
                    lead,
                    pieceworker,
                    photos,
                    comments,
                    taskId,
                },
            }).status(200)
        } else {
            res.json({ ...response_error, message: "not data" })
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
