import Nav from "./Nav.jsx"
import { NavLink } from "react-router-dom"
import { Fragment } from "react"

const Home = () => {
    return (
        <Fragment>
            <div className="mainHome">
                <div className ="background_image">
                    
                    <Nav /> 
                
                    <div className = "blur">
                        
                        
                        <h1>Retro Games</h1>
                    
                    </div>
                    <div>
                        <NavLink to="/admin/ProductsFilter">
                        <i className="fa-solid fa-gamepad">
                        </i></NavLink>
                    </div>
                </div>
                
            </div>
            
        </Fragment>

    )
}

export default Home
