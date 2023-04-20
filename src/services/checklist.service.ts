import { getDateString } from "../utils/date"
import { getProgress } from "../utils/number"
import { getNumberOfElements } from "../utils/filter"
import partidas from "../data/partidas.json"
import piecework from "../data/piecework.json"
import groups from "../data/groups.json"
import { getInicidets } from "../services/pieceworker.services"

export function getCheklist(groupId: string) {
    const detail = partidas.detail.find(({ uid }) => uid === groupId)
    const index = partidas.detail.findIndex(({ uid }) => uid === groupId)
    const group = groups[index]
    const data = {
        ...group,
        startDate: getDateString(group?.startDate || ""),
        finishDate: getDateString(group?.finishDate || ""),
    }
    const pieceworkList =
        detail?.list.map((key, index) => {
            let item = piecework[index]
            return {
                ...item,
                name: key,
                editable: true,
                incidents: item.status === "in-progress" ? getInicidets(item.incidents) : [],
                tasks: [],
                startDate: getDateString(item.startDate),
                finishDate: getDateString(item.finishDate),
            }
        }) || []

    const incidents = pieceworkList.filter(({ incidents }) => incidents.length > 0).length

    const subtotals = {
        toDo: getNumberOfElements(pieceworkList, "to-do"),
        inProgress: getNumberOfElements(pieceworkList, "in-progress"),
        finished: getNumberOfElements(pieceworkList, "finished"),
    }

    const totals = {
        ...subtotals,
        inProgress: subtotals.inProgress - incidents,
        incidents,
    }

    const progress = getProgress(subtotals)

    return { ...data, pieceworks: pieceworkList, totals, progress }
}
