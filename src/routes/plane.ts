import { Router, Request, Response } from "express"
import { response_error, response_success } from "../constants"
import { authMiddleware } from "../middleware"
import plots from "../data/plots.json"

const router = Router()

router.use(authMiddleware)

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)
    try {
        const data = {
            streets: ["Calle 1", "Calle 2"],
            blocks: [
                {
                    number: 1,
                    plots: plots.map(({ uid, status, progress }, index) => {
                        return {
                            uid,
                            number: index + 1,
                            status,
                            incidents: index === 2 ? 2 : 0,
                            progress,
                        }
                    }),
                },
            ],
        }
        res.json({
            ...response_success,
            message: "success data",
            data,
        }).status(200)
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
})

export default router
