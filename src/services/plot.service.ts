import plotsData from "../data/plots.json"
import blocksData from "../data/blocks.json"
import { getAllPlanes } from "../services/plane.services"
import { getId, getNumberKey, getPlotName } from "../utils/string"
import { getDateString } from "../utils/date"
import { getBatchList, getCheklist } from "../services/checklist.service"

export const getPlotsByBlocks = (blocks: string[]) => {
    const array = blocks?.map((blockId) => {
        const block = blocksData.find(({ uid }) => uid === blockId)
        const plots = block?.plots
        const blockIndex = block?.number || 1
        return plots?.map((plotId, index) => {
            return getPlotById(plotId)
        })
    })
    return array.flat(1)
}

export function getPlotsIdByPlane(planeId: string) {
    const plane = getAllPlanes().find(({ uid }) => planeId === uid)
    const plots =
        plane?.blocks?.map(({ plots, number }) => {
            return plots?.map((plotId) => {
                return `${plane.uid}-mz_${number}-${plotId}`
            })
        }) || []

    const clear = plots.flat(1)
    return [...new Set(clear)]
}

export function getPlotById(plotId: string) {
    const [planeId, mzId, plotUID] = getId(plotId)
    const plot = plotsData.find(({ uid }) => uid === plotUID)

    const area = getBatchList(planeId)
    const incidents =
        area
            .map(({ ref }) => {
                return getCheklist(planeId, plotUID, ref).pieceworks.map(({ incidents }) => {
                    return incidents
                })
            })
            .flat(1) || []

    return {
        ...plot,
        uid: plotId,
        name: getPlotName(getNumberKey(mzId), getNumberKey(plotUID)),
        finishDate: plot?.finishDate ? getDateString(plot?.finishDate, true) : "",
        incidents: plot?.status === "in-progress" ? incidents : [],
    }
}
