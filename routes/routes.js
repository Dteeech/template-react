import express from "express"
import addUserController from "../controllers/addUserController.js"
import middleware from "../controllers/middleware.js";
import loginController from "../controllers/loginController.js"
import deleteUserId from "../controllers/deleteUserId.js"
import allUsers from "../controllers/admin/allUsers.js"
import editUserById from "../controllers/editUserById.js"
import getUserById from "../controllers/getUserId.js"
import editInfosUser from "../controllers/admin/editInfosUser.js"
import addProduct from "../controllers/admin/addProduct.js"
import uploadFileMiddleware from "../controllers/uploadFileMiddleware.js"
import deleteProduct from "../controllers/admin/deleteProduct.js"
import allProducts from "../controllers/admin/allProducts.js"
import getProductId from "../controllers/admin/getProductId.js"
import updateProduct from "../controllers/admin/updateProduct.js"
import updateProductPicture from "../controllers/admin/updateProductPicture.js"
import checkToken from "../controllers/checkToken.js"
import addToCart from "../controllers/addToCart.js"
import deleteFromCart from "../controllers/deleteFromCart.js"
import getCartFromUserId from "../controllers/getCartFromUserId.js"
import clearCart from "../controllers/clearCart.js"


const router = express.Router()

const routesGET = [
    { route: "/admin/allUsers", controller: allUsers },
    { route: "/admin/allProducts", controller: allProducts },
    { route: "/relogged", controller: checkToken }
]

const routesPOST = [
    { route: "/login", controller: loginController },
    { route: "/addUser", controller: addUserController },
    { route: "/getUserId", controller: getUserById },
    { route: "/deleteUserId", controller: deleteUserId },
    { route: "/editUserById", controller: editUserById },
    { route: "/admin/editInfosUser", controller: editInfosUser },
    { route: "/admin/deleteProduct", controller: deleteProduct },
    { route: "/admin/getProductId", controller: getProductId },
    { route: "/cart/addToCart", controller: addToCart },
    { route: "/cart/deleteFromCart", controller: deleteFromCart },
    { route: "/admin/updateProduct", controller: updateProduct },
    { route: "/cart/getCart", controller: getCartFromUserId },
    { route: "/cart/clearCart", controller: clearCart },
    
]

const routesUPLOAD = [
    { route: "/admin/addProduct", controller: addProduct },
    { route: "/admin/updateProductPicture", controller: updateProductPicture }

]

routesGET.map((item) => {
    router.get(item.route, middleware, item.controller);
})
routesPOST.map((item) => {
    router.post(item.route, middleware, item.controller);
})

routesUPLOAD.map((item) => {
    router.post(item.route, middleware, uploadFileMiddleware, item.controller)
})

export default router
