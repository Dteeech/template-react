import UserIsLogged from "../UserIsLogged.jsx"
import {StoreContext} from "../../tools/context.js"
import {useContext} from "react"
import {Fragment} from "react"

const AdminHome = () => {
    const [state, dispatch ] = useContext(StoreContext)
    return(
        <Fragment>
            <h1>Admin</h1>
            {state.user.isLogged ?
                (<UserIsLogged />)
                
                : (<a href="/login">Se connecter</a>)
                
            }
        </Fragment>
    
    ) 
}

export default AdminHome