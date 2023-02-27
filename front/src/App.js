import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Error404 from "./components/Error404"
import AddUser from "./components/AddUser"
import Login from "./components/Login"
import UserMyAccount from "./components/UserMyAccount"
import ListUsers from "./components/admin/ListUsers"
import EditUsers from "./components/admin/EditUsers"
import AdminHome from "./components/admin/AdminHome"
import AddProduct from "./components/admin/AddProduct"
import ListProducts from "./components/admin/ListProducts"
import EditProduct from "./components/admin/EditProduct"

function App() {
  return (
    <BrowserRouter>
      <div className = "main">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/MyAccount/:userId" element={<UserMyAccount />} />
          <Route path="/admin/users/edit/:userId" element={<EditUsers />} />
          <Route path="/admin/listUsers" element={<ListUsers />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="/admin/listProducts" element={<ListProducts />} />
          <Route path="/admin/product/edit/:productId" element={<EditProduct />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
