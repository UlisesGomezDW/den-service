import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import plane from "../data/plane.json"
import blocksData from "../data/blocks.json"
import plotsData from "../data/plots.json"
import { getPlotName } from "../utils/string"
import { getDateString } from "../utils/date"

type Plot = {
    uid: string
    model: string
    status: string
    progress: number
    groups?: string[]
    finishedDate: string
}

const router = Router()

router.use(authMiddleware)

const getPlots = (blocks: string[]) => {
    const array = blocks?.map((blockId) => {
        const block = blocksData.find(({ uid }) => uid === blockId)
        const plots = block?.plots
        const blockIndex = block?.number || 1
        return plots?.map((plotId, index) => {
            const plot: Plot | undefined = plotsData.find(({ uid }) => uid === plotId)
            if (plot) delete plot.groups
            return {
                ...plot,
                name: getPlotName(blockIndex, index + 1),
                incidents: index === 2 ? 2 : 0,
                finishedDate: plot?.finishedDate ? getDateString(plot?.finishedDate, true) : "",
            }
        })
    })
    return array.flat(1)
}

router.get("/", (req: Request, res: Response) => {
    try {
        const planeId = req.query.planeId
        if (planeId) {
            const blocks: any[] = plane.find(({ uid }) => uid === planeId)?.blocks || []
            const blockList = getPlots(blocks)
            res.json({
                ...response_success,
                data: blockList,
            }).status(200)
        } else {
            const data = plane.map(({ blocks }) => getPlots(blocks))
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

export default router
