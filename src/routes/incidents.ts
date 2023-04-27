import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import incidents from "../data/incidents.json"
import pieceworkers from "../data/pieceworkers.json"
import tasks from "../data/tasks.json"
import { getDateString } from "../utils/date"

const router = Router()

router.use(authMiddleware)

router.post("/", (req: Request, res: Response) => {
    const { lead = "", pieceworker = [], photos = [], detail = "" } = req.body
    try {
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                message: "success",
                data: {
                    lead,
                    pieceworker,
                    photos,
                    detail,
                },
            }).status(200)
        } else {
            res.json({ ...response_error, message: "not data" })
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

router.post("/solution", (req: Request, res: Response) => {
    const { photos = [], detail = "", incidentId = "" } = req.body
    try {
        if (Object.values(req.body).length > 0) {
            res.json({
                ...response_success,
                message: "success",
                data: {
                    incidentId,
                    photos,
                    detail,
                },
            }).status(200)
        } else {
            res.json({ ...response_error, message: "not data" })
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

const getIncident = (incidentId: string) => {
    const data = incidents.find(({ uid }) => uid == incidentId)
    const index = incidents.findIndex(({ uid }) => uid == incidentId)
    return {
        uid: data?.uid,
        name: tasks[index]?.name || "Tarea",
        pieceworker: pieceworkers.find(({ uid }) => uid === data?.pieceworker)?.name || "",
        detail: data?.detail,
        photos: data?.photos,
        createdAt: getDateString(`${data?.createdAt}`),
    }
}

router.get("/", (req: Request, res: Response) => {
    try {
        const incidentId = req.query.incidentId || ""
        if (incidentId) {
            res.json({
                ...response_success,
                data: getIncident(`${incidentId}`),
            }).status(200)
        } else {
            res.json({
                ...response_success,
                data: incidents.map(({ uid }) => {
                    return getIncident(`${uid}`)
                }),
            }).status(200)
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
