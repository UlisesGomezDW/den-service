import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import { getPlotById, getPlotsByBlocks } from "../services/plot.service"
import plane from "../data/plane.json"

const router = Router()

router.use(authMiddleware)

router.get("/", (req: Request, res: Response) => {
    try {
        const planeId = req.query.planeId || ""
        const plotId = req.query.plotId || ""
        if (planeId) {
            const blocks: any[] = plane.find(({ uid }) => uid === planeId)?.blocks || []
            const blockList = getPlotsByBlocks(blocks)
            res.json({
                ...response_success,
                data: blockList,
            }).status(200)
        } else if (plotId) {
            const data = getPlotById(`${plotId}`, { blockIndex: 1, index: 1 })
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else {
            const data = plane.map(({ blocks }) => getPlotsByBlocks(blocks))
            res.json({
                ...response_success,
                data: data.flat(),
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
