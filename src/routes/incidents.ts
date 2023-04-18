import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import incidents from "../data/incidents.json"
const router = Router()

router.use(authMiddleware)

router.post("/", (req: Request, res: Response) => {
    const { lead = "", pieceworker = [], photos = [], detail = "" } = req.body
    try {
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                message: "success",
                data: {
                    lead,
                    pieceworker,
                    photos,
                    detail,
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

router.post("/solution", (req: Request, res: Response) => {
    const { photos = [], detail = "", incidentId = "" } = req.body
    try {
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                message: "success",
                data: {
                    incidentId,
                    photos,
                    detail,
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

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = incidents.find(({ uid }) => uid == id)

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
