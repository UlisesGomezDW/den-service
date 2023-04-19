import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"

import partidas from "../data/partidas.json"
import { getCheklist } from "../services/checklist.service"

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
        const groupId = req.query.groupId || ""
        if (groupId) {
            const data = getCheklist(groupId.toString())
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else {
            const data = partidas.list.map(({ uid, groups }) => {
                return {
                    uid,
                    groups: groups.map(({ uid }) => getCheklist(uid)),
                }
            })
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

export default router
