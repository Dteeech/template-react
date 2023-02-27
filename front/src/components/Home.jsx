import UserIsLogged from "./UserIsLogged.jsx"
import { StoreContext } from "../tools/context.js"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { Fragment } from "react"
import  photo_commodore from "../assets/img/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg"

const Home = () => {
    const [state, dispatch] = useContext(StoreContext)
    return (
        <div className ="background_image">
            <h1>Retro Games</h1>
            
            {state.isLogged ?
                (<UserIsLogged />)
                
                : (<NavLink to="/login">Se connecter</NavLink>)
                
            }
            
        </div>
        

    )
}

export default Home
