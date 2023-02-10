import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import AddUser from "./components/AddUser";
import Login from "./components/Login";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <BrowserRouter>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<UploadFile />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
