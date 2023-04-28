import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import { getPlotById, getPlotsIdByPlane } from "../services/plot.service"
import { getAllPlanes } from "../services/plane.services"
import { getId } from "../utils/string"
import { getPlotName } from "../utils/string"
import { getNumberKey } from "../utils/string"
import pieceworkers from "../data/pieceworkers.json"
import leaders from "../data/leaders.json"
import { getRandomNumber } from "../utils/number"

const router = Router()

router.use(authMiddleware)

router.get("/", (req: Request, res: Response) => {
    try {
        const planeId = req.query.planeId || ""
        const plotId = req.query.plotId || ""
        if (planeId) {
            const keys: any[] = getPlotsIdByPlane(`${planeId}`)
            const data = keys?.map((id = "") => {
                return getPlotById(id)
            })
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else if (plotId) {
            const data = getPlotById(`${plotId}`)
            res.json({
                ...response_success,
                data,
            }).status(200)
        } else {
            const plotKeys =
                getAllPlanes()
                    .map(({ uid }) => {
                        return getPlotsIdByPlane(uid)
                    })
                    .flat(1) || []
            const data = plotKeys?.map((id = "") => {
                return getPlotById(id)
            })
            res.json({
                ...response_success,
                data: data.flat(1),
            }).status(200)
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.get("/validation", (req: Request, res: Response) => {
    try {
        const plotId = req.query.plotId || ""
        const [planeId] = getId(`${plotId}`)
        const filter: any[] = getPlotsIdByPlane(`${planeId}`).filter((value) => value !== plotId)
        const keys: string[] = filter.filter((_, index) => index <= 2)
        const plots = [plotId, ...keys].map((uid) => {
            const [_, mz, plot] = getId(`${uid}`)
            return {
                uid,
                name: getPlotName(getNumberKey(mz), getNumberKey(plot)) || "",
            }
        })

        const number = getRandomNumber(pieceworkers.length - 1)
        const next = number === pieceworkers.length - 1 ? number - 1 : number + 1
        const pieceworkerList: string[] = [pieceworkers[number]?.name, pieceworkers[next]?.name]

        res.json({
            ...response_success,
            data: {
                plots,
                leaders: [leaders[getRandomNumber(leaders.length - 1)]?.name],
                pieceworkers: pieceworkerList,
            },
        }).status(200)
    } catch (err: any) {
        res.json({ ...response_error, message: err?.message })
        console.log(err)
    }
})

export default router
