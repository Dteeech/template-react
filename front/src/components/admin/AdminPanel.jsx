import AdminSideBar from "./AdminSideBar"
import ListUsers from "./ListUsers.jsx"

import { useState }from 'react'

const AdminPanel = () => {
    const [selectedComponent, setSelectedComponent] = useState(<ListUsers />)
    
    const handleNavigation = (component) => {
        setSelectedComponent(component)
    }
    
    return (
        <div className="admin_panel">
            <AdminSideBar onNavigation={handleNavigation}/>
            <div>
                {selectedComponent}
            </div>
        </div>
        
    )
}

export default AdminPanel