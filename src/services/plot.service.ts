import plotsData from "../data/plots.json"
import partidasData from "../data/partidas.json"
import blocksData from "../data/blocks.json"
import { getPlotName } from "../utils/string"
import { getDateString } from "../utils/date"
import { getCheklist } from "../services/checklist.service"

export const getPlotsByBlocks = (blocks: string[]) => {
    const array = blocks?.map((blockId) => {
        const block = blocksData.find(({ uid }) => uid === blockId)
        const plots = block?.plots
        const blockIndex = block?.number || 1
        return plots?.map((plotId, index) => {
            return getPlotById(plotId, { blockIndex, index: index + 1 })
        })
    })
    return array.flat(1)
}

export function getPlotById(plotId: string, { blockIndex = 1, index = 1 }) {
    const plot = plotsData.find(({ uid }) => uid === plotId)

    const partidas = partidasData.list.find(({ uid }) => uid === plot?.partida)?.groups
    const incidents =
        partidas
            ?.filter(({ uid }) => {
                return getCheklist(uid).pieceworks.map(({ incidents }) => {
                    return incidents
                })
            })
            .flat(1) || []

    return {
        ...plot,
        name: getPlotName(blockIndex, index),
        finishDate: plot?.finishDate ? getDateString(plot?.finishDate, true) : "",
        incidents: plot?.status === "in-progress" ? incidents : [],
    }
}
