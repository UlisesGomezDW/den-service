import { Request, Response } from "express"
import { response_error, response_success } from "./../constants"
import data from "./../data/users.json"

export async function login(req: Request, res: Response) {
    const { username, password } = req.body
    try {
        if (username && password) {
            const token = "token90"

            const user = data?.find((user: any) => user.username === username && user.password === password)

            res.json({
                ...response_success,
                token: token,
                message: "success login",
                data: { ...user, password: "..." },
            }).status(200)
        } else {
            res.json({ ...response_error, message: "username or password not received" }).status(404)
        }
    } catch (err: any) {
        console.error(err)
        res.json({ ...response_error, message: err?.message })
    }
}
