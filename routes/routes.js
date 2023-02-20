import express from "express"
import addUserController from "../controllers/addUserController.js"
import middleware from "../controllers/middleware.js";
import loginController from "../controllers/loginController.js"
import uploadFile from "../controllers/admin/uploadFile.js"
import deleteUserId from "../controllers/deleteUserId.js"
import allUsers from "../controllers/admin/allUsers.js"
import editUserById from "../controllers/editUserById.js"
import getUserById from "../controllers/getUserId.js"
import editInfosUser from "../controllers/admin/editInfosUser.js"

const router = express.Router()

const routesGET = [
    { route: "/admin/allUsers", controller: allUsers },
    { route: "/admin/AdminHome", controller: allUsers },
]

const routesPOST = [
    { route: "/login", controller: loginController },
    { route: "/addUser", controller: addUserController },
    { route: "/upload", controller: uploadFile },
    { route: "/deleteUserId", controller: deleteUserId },
    { route: "/editUserById", controller: editUserById },
    { route: "/admin/editInfosUser", controller: editInfosUser },
    { route: "/getUserId", controller: getUserById },
    { route: "/uploadFile", controller: uploadFile }
]


routesGET.map((item) => {
    router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) => {
    router.post(item.route, middleware, item.controller);
})


export default router
