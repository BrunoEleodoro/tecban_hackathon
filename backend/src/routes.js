import { Router } from "express"

// Controller imports
import { Controller } from "./controllers/TecBanConsentimento"

const routes = Router()


routes.get('/getAcessToken/:banco', Controller.main)

export default routes