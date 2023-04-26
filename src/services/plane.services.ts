import plane from "../data/plane.json"
import blockData from "../data/blocks.json"
import { getNumberOfElements } from "../utils/filter"
import { getPlotById, getPlotsIdByPlane } from "../services/plot.service"
import { getProgress } from "../utils/number"

export function getAllPlanes() {
    const data = plane.map(({ uid, blocks, area }) => {
        const blocksItem = blocks.map((blockId) => {
            const block = blockData.find(({ uid }) => uid === blockId)

            return {
                plots: block?.plots,
                number: block?.number,
            }
        })
        return {
            uid,
            blocks: blocksItem,
            area,
        }
    })

    return data
}

export function getTotals(planeId: string) {
    const keys: any[] = getPlotsIdByPlane(`${planeId}`)
    const allPlots = keys?.map((id = "") => {
        return getPlotById(id)
    })
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

    return {
        totals,
        progress,
    }
}
