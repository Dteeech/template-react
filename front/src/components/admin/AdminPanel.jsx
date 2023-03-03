import AdminSideBar from "./AdminSideBar"
import {NavLink} from "react-router-dom"
import Fragment from "react"

const AdminPanel = () => {
    
    return (
        <Fragment>
            <AdminSideBar />
            <NavLink to="/">
                Accueil
            </NavLink>
        </Fragment>
        
    )
}

export default AdminPanel