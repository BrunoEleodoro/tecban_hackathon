import {
    request
} from "./requests"

import { Request, Response } from "express"

class Controller {
    async main(req: Request, res: Response) {
        const { banco } = req.params
        const Res = await request.GetAcessToken(banco, 'token here')
        if (!Res[0]) {
            return res.json({"Error":Res[1]})
        }
        const token = Res[1].access_token
        return res.json({token})
    }
}   

export const controller = new Controller