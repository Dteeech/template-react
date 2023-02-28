import Error404 from "../components/Error404"
import Home from "../components/Home"
import Login from "../components/Login"
import AddUser from "../components/AddUser"
import Nav from "../components/Nav"
import UserMyAccount from "../components/UserMyAccount"
import ListUsers from "../components/admin/ListUsers"
import EditUsers from "../components/admin/EditUsers"
import AdminHome from "../components/admin/AdminHome"
import AddProduct from "../components/admin/AddProduct"
import ListProducts from "../components/admin/ListProducts"
import EditProduct from "../components/admin/EditProduct"
import AdminPanel from "../components/admin/AdminPanel"


const routes = [
    {path:"/", component:<Home />},
    {path:"/login", component:<Login />},
    {path:"/register", component:<AddUser />},
    {path:"/nav", component:<Nav />, auth:"user"},
    {path:"/MyAccount/:userId", component:<UserMyAccount />, auth:"user"},
    {path:"/admin/listUsers", component:<ListUsers />, auth:"admin"},
    {path:"/admin/users/edit/:userId", component:<EditUsers />, auth:"admin"},
    {path:"/admin/adminHome", component:<AdminHome />, auth:"admin"},
    {path:"/admin/addProduct", component:<AddProduct />, auth:"admin"},
    {path:"/admin/listProducts", component:<ListProducts />, auth:"admin"},
    {path:"/admin/product/edit/:productId", component:<EditProduct />, auth:"admin"},
    {path:"/admin/AdminPanel", component:<AdminPanel />, auth:"admin"},
    {path:"*", component:<Error404 />}
]

export default routes