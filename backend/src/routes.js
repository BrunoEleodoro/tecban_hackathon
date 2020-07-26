import { Router } from "express"
const routes = Router()

routes.get('/', (_,res) => {
    return res.json({"message": "Ok"})
})

export default routes