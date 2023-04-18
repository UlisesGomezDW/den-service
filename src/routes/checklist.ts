import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import { getDateString } from "../utils/date"
import { getNumberOfElements } from "../utils/filter"
import partidas from "../data/partidas.json"
import piecework from "../data/piecework.json"
import groups from "../data/groups.json"

const router = Router()

router.use(authMiddleware)

router.get("/partidas/:id", (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = partidas.list.find(({ uid }) => uid === id)

        // @ts-ignore
        delete data?.uid

        res.json({
            ...response_success,
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/", (req: Request, res: Response) => {
    try {
        const groupId = req.query.groupId

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
                    incidents: [],
                    tasks: [],
                    startDate: getDateString(item.startDate),
                    finishDate: getDateString(item.finishDate),
                }
            }) || []
        // @ts-ignore
        //delete data?.uid
        const totals = {
            toDo: getNumberOfElements(pieceworkList, "to-do"),
            inProgress: getNumberOfElements(pieceworkList, "in-progress"),
            finished: getNumberOfElements(pieceworkList, "finished"),
            incidents: 0,
        }

        res.json({
            ...response_success,
            data: { ...data, pieceworks: pieceworkList, totals },
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
