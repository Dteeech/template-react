import UserIsLogged from "./UserIsLogged.jsx"
import { StoreContext } from "../tools/context.js"
import Nav from "./Nav.jsx"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { Fragment } from "react"
import photo_commodore from "../assets/img/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg"

const Home = () => {
    const [state, dispatch] = useContext(StoreContext)
    return (
        <Fragment>
            <div className="mainHome">
                <div className ="background_image">
                    <div className = "blur homeNav">
                        <Nav />    
                    </div>
                
                <div className="space"></div>
                    <div className = "blur">
                        
                        
                        <h1>Retro Games</h1>
                    
                    </div>
                    <div className="space"></div>
                    <div className="preshop">
                        <div>
                            <div className="home_console">
                                <h2>Consoles</h2>
                                
                            </div>
                            <div className="home_jeux">
                                <h2>Jeux</h2>
                            </div>
                        </div>
                    </div>
                  </div>
                    
                </div>
            
        </Fragment>

    )
}

export default Home
