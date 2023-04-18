import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import partidas from "../data/partidas.json"
import piecework from "../data/piecework.json"

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
        const data = {
            progress: 50,
            startDate: "2021-10-05T14:48:00.000Z",
            finishedDate: "2022-04-30T14:48:00.000Z",
        }
        const pieceworkList = detail?.list.map((key, index) => {
            let item = piecework[index]
            return {
                ...item,
                name: key,
                editable: true,
                incidents: [],
            }
        })
        // @ts-ignore
        //delete data?.uid

        res.json({
            ...response_success,
            data: { ...data, piecework: pieceworkList },
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
