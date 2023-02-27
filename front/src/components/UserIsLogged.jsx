import React from "react"
import { StoreContext } from "../tools/context.js"
import axios from "axios"
const UserIsLogged = () => {

    const [state, dispatch] = React.useContext(StoreContext)

    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({ type: "LOGOUT" })
        delete axios.defaults.header.common['Authorization']
    }
    return (
        <div>
            <p> Vous êtes connecté {state.user.first_name} {state.user.last_name}</p>
            <button onClick={logout}>Déconnexion </button>
        </div>

    )

}
export default UserIsLogged
