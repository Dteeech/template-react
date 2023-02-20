import UserIsLogged from "./UserIsLogged.jsx"
import {StoreContext} from "../tools/context.js"
import {useContext} from "react"
import {Navigate} from "react-router-dom"
import {Fragment} from "react" 

const Home = () => {
    const [state, dispatch ] = useContext(StoreContext)
    return(
        <Fragment>        
            <h1>Retro Games</h1>
            {state.isLogged ?
                (<UserIsLogged />)
                
                : (<a href="/login">Se connecter</a>)
                
            }
        </Fragment>
    
    ) 
}

export default Home