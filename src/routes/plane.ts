import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import { getAllPlanes } from "../services/plane.services"
import plots from "../data/plots.json"
import planes from "../data/plane.json"
import { getNumberOfElements } from "../utils/filter"
import { getPlotsByBlocks } from "../services/plot.service"
import { getProgress } from "../utils/number"

const router = Router()

router.use(authMiddleware)

const getPlot = (array: any[]) =>
    array.map(({ uid, status, progress, model }, index) => {
        return {
            uid,
            number: index + 1,
            status,
            model,
            incidents: index === 2 ? 2 : 0,
            progress,
        }
    })

router.get("/", (req: Request, res: Response) => {
    try {
        const planeId = req.query.planeId
        if (planeId) {
            const data = {
                streets: ["Calle 1", "Calle 2"],
                blocks: [
                    {
                        number: 1,
                        plots: getPlot(plots),
                    },
                    {
                        number: 2,
                        plots: getPlot([plots[0]]),
                    },
                ],
            }
            res.json({
                ...response_success,
                message: "success data",
                data,
            }).status(200)
        } else {
            const data = getAllPlanes()
            res.json({
                ...response_success,
                data,
            }).status(200)
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/totals/:id", (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const blocks = planes.find(({ uid }) => uid == id)?.blocks || []
        const allPlots = getPlotsByBlocks(blocks)
        const incidents = allPlots.filter((plot) => plot?.incidents && plot?.incidents.length > 0)
        const subtotals = {
            toDo: getNumberOfElements(allPlots, "to-do"),
            inProgress: getNumberOfElements(allPlots, "in-progress"),
            finished: getNumberOfElements(allPlots, "finished"),
        }

        const progress = getProgress(subtotals) || 0

        const totals = {
            ...subtotals,
            incidents: incidents.length,
        }

        res.json({
            ...response_success,
            message: "success data",
            data: {
                totals,
                progress,
            },
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
