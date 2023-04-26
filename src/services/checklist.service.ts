import { getDateString } from "../utils/date"
import { getProgress } from "../utils/number"
import { getNumberOfElements } from "../utils/filter"
import piecework from "../data/piecework.json"
import groups from "../data/groups.json"
import planes from "../data/plane.json"
import lista from "../data/lista.json"
import { getInicidets, getTasks } from "../services/pieceworker.services"

type ListaItem = typeof lista.ct

export function getBatchList(planeId: string) {
    const area = planes.find(({ uid }) => uid === planeId)?.area || ""

    // @ts-ignore
    const collection: ListaItem = lista[area] || lista.obra
    const data =
        collection?.map(({ name = "", uid = "" }) => {
            return {
                name,
                ref: uid,
            }
        }) || []

    return data
}

export function getCheklist(plnaeId: string, plotId: string, ref: string) {
    const collection = Object.values(lista).flat(1) || []
    const items = collection.find(({ uid }) => uid === ref)?.items || []
    const index = collection.findIndex(({ uid }) => uid === ref) || 0

    const group = groups[index] || groups[0]
    const data = {
        ...group,
        uid: `${plnaeId}-${plotId}-${ref}`,
        startDate: getDateString(group?.startDate || ""),
        finishDate: getDateString(group?.finishDate || ""),
    }
    const pieceworkList =
        items.map((key, index) => {
            let item = piecework[index]
            return {
                ...item,
                name: key,
                editable: true,
                incidents: item.status === "in-progress" ? getInicidets(item.incidents) : [],
                status:
                    item.status === "in-progress"
                        ? getInicidets(item.incidents).length > 0
                            ? "incidents"
                            : "in-progress"
                        : item.status,
                tasks: getTasks(item.tasks),
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
        inProgress: subtotals.inProgress,
        incidents,
    }

    const progress = getProgress(subtotals)

    return { ...data, pieceworks: pieceworkList, totals, progress, total: pieceworkList.length }
}

/*
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
*/
