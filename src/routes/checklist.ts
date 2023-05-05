import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import lista from "../data/lista.json"
import { getBatchList, getCheklist } from "../services/checklist.service"
import { getAllPlanes } from "../services/plane.services"
import { getId } from "../utils/string"
import { createPromise } from "../utils/promise"

const router = Router()

router.use(authMiddleware)

router.get("/batch", (req: Request, res: Response) => {
    try {
        const planeId = req.query.planeId || ""
        if (planeId) {
            const data = getBatchList(`${planeId}`)
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else {
            const collection = Object.values(lista).map((value) =>
                value.map(({ uid, name }) => {
                    return {
                        name,
                        ref: uid,
                    }
                })
            )
            const data = Object.keys(lista).reduce((obj, key, index) => {
                return { ...obj, [key]: collection[index] }
            }, {})

            res.json({
                ...response_success,
                data: data,
            }).status(200)
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const plotId = req.query?.plotId || ""
        const ref = req.query?.ref || ""
        if (plotId && ref) {
            const [planeId, mz, plotID] = getId(`${plotId}`)
            const data = await createPromise(getCheklist(`${planeId}`, `${plotID}`, `${ref}`))
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else {
            const plotsArray = getAllPlanes()
                .map(({ uid, blocks }) => {
                    const plots = blocks.map(({ plots }) => {
                        return plots?.map((plotId) => {
                            return uid + "-" + plotId
                        })
                    })

                    return plots
                })
                .flat(2)

            const data = [...new Set(plotsArray)]
                .map((key = "") => {
                    const path = key.split("-")
                    const planeId = path[0]
                    const plotId = path[1]

                    const list = getBatchList(planeId).map(({ ref }) => ref)

                    return list.map((ref) => {
                        return getCheklist(planeId, plotId, ref)
                    })
                })
                .flat(1)
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

router.post("/pending-completion", (req: Request, res: Response) => {
    const { pieceworks = [] } = req.body
    try {
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                data: { pieceworks },
            }).status(200)
        } else {
            res.json({ ...response_error, message: "not data" })
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
