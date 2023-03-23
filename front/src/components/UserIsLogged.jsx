import { useContext } from "react"
import { StoreContext } from "../tools/context.js"
import axios from "axios"

const UserIsLogged = () => {

    const [state, dispatch] = useContext(StoreContext)

    const logout = () => {

        console.log(state.user.isLogged)
        localStorage.removeItem('jwtToken') //suppression du token
        dispatch({ type: "LOGOUT" })
        delete axios.defaults.header.common['Authorization']

    }
    return (
        <div>
            <p> Vous êtes connecté {state.user.first_name} {state.user.last_name}</p>
            <button className="logout" onClick={logout}>Déconnexion </button>
        </div>

    )

}
export default UserIsLogged