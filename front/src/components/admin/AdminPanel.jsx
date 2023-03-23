import AdminSideBar from "./AdminSideBar"
import Nav from "../Nav.jsx"
import {NavLink} from "react-router-dom"
import Fragment from "react"
import ListUsers from "./ListUsers.jsx"

import { useState }from 'react'

const AdminPanel = () => {
    const [selectedComponent, setSelectedComponent] = useState(<ListUsers />)
    
    const handleNavigation = (component) => {
        setSelectedComponent(component)
    }
    
    return (
        <div className="admin_panel">
        <Nav />
            <AdminSideBar onNavigation={handleNavigation}/>
            <div>
                {selectedComponent}
            </div>
        </div>
        
    )
}

export default AdminPanel