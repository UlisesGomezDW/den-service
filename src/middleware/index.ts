import { Request, Response, NextFunction } from "express"
import { response_error } from "../constants"
import data from "./../data/users.json"

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        res.json({ ...response_error, message: "auth headers not received" }).status(401)
    } else {
        const token = req.headers.authorization.split("Bearer ")[1]

        if (!token) {
            res.json({ ...response_error, message: "not resived token", error: true }).status(401)
        }

        let payload = null
        try {
            payload = data?.find((user: any) => user.id === 1)
        } catch (e) {
            return res.json({ ...response_error, message: "invalid token", error: true }).status(401)
        }

        // @ts-ignore
        req.user = {
            id: payload?.id,
        }

        next()
        return
    }
}
