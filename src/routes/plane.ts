import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import { getAllPlanes } from "../services/plane.services"
import plots from "../data/plots.json"
import { getNumberOfElements } from "../utils/filter"

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
        const planes = getAllPlanes()
        const consult = planes.find(({ uid }) => uid == id)?.blocks
        const blocks = consult?.map(({ plots }) => plots)
        const allPlots =
            blocks?.flat(1).map((plotId) => {
                const plot = plots.find(({ uid }) => plotId === uid)
                return {
                    status: plot?.status,
                }
            }) || []

        const data = {
            toDo: getNumberOfElements(allPlots, "to-do"),
            inProgress: getNumberOfElements(allPlots, "in-progress"),
            finished: getNumberOfElements(allPlots, "finished"),
            incidents: 0,
        }
        res.json({
            ...response_success,
            message: "success data",
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
