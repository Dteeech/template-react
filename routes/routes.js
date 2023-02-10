import express from "express"
import addUserController from "../controllers/addUserController.js"
import middleware from "../controllers/middleware.js";
import loginController from "../controllers/loginController.js"
import uploadFile from "../controllers/uploadFile.js"

const router = express.Router()

const routesGET = [
    
]

const routesPOST = [
    {route:"/login", controller:loginController},
    {route:"/addUser", controller:addUserController},
    {route:"/upload", controller:uploadFile}
]
    
    
routesGET.map((item) =>{
        router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) =>{
        router.post(item.route, middleware, item.controller);
})


export default router