import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Error404 from "./components/Error404"
import AddUser from "./components/AddUser"
import Login from "./components/Login"
import UploadFile from "./components/UploadFile"
import UserMyAccount from "./components/UserMyAccount"
import ListUsers from "./components/admin/ListUsers"
import EditUsers from "./components/admin/EditUsers"
import AdminHome from "./components/admin/AdminHome"

function App() {
  return (
    <BrowserRouter>
      <div class = "main">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/MyAccount/:userId" element={<UserMyAccount />} />
          <Route path="/admin/users/edit/:userId" element={<EditUsers />} />
          <Route path="/admin/listUsers" element={<ListUsers />} />
          <Route path="/admin/uploadMultipleFiles" element={<UploadMultipleFiles/>} />
          <Route path="/admin/uploadFile" element={<UploadFile />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
