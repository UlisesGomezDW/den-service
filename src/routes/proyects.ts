import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import proyects from "../data/proyects.json"
import area from "../data/area.json"

const router = Router()

router.use(authMiddleware)

router.get("/", (req: Request, res: Response) => {
    try {
        const data = proyects.map((item) => {
            return {
                ...item,
                area: item.area.map((key) => {
                    let picker = area.find(({ uid }) => uid === key)
                    return {
                        name: picker?.name,
                        plane: picker?.plane,
                    }
                }),
            }
        })
        res.json({
            ...response_success,
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
