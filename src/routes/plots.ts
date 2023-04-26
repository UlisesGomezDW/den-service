import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import { getPlotById, getPlotsIdByPlane } from "../services/plot.service"
import { getAllPlanes } from "../services/plane.services"

const router = Router()

router.use(authMiddleware)

router.get("/", (req: Request, res: Response) => {
    try {
        const planeId = req.query.planeId || ""
        const plotId = req.query.plotId || ""
        if (planeId) {
            const keys: any[] = getPlotsIdByPlane(`${planeId}`)
            const data = keys?.map((id = "") => {
                return getPlotById(id)
            })
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else if (plotId) {
            const data = getPlotById(`${plotId}`)
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else {
            const plotKeys =
                getAllPlanes()
                    .map(({ uid }) => {
                        return getPlotsIdByPlane(uid)
                    })
                    .flat(1) || []
            const data = plotKeys?.map((id = "") => {
                return getPlotById(id)
            })
            res.json({
                ...response_success,
                data: data.flat(1),
            }).status(200)
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.post("/validation", (req: Request, res: Response) => {
    const { plots = [], comments = "" } = req.body
    try {
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                data: {
                    plots,
                    comments,
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
