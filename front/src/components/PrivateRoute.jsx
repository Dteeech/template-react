import {Navigate, useLocation} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import {BASE_URL} from "../tools/constante.js"
import {useEffect, useContext, useState} from 'react'
import axios from 'axios'

const PrivateRoute = ({children, auth = null}) => {
    // permet de recuperer le pathname ex: http://najs02.ide.3wa.io:3000/login => /login
    const location = useLocation().pathname;
    const [loading, setLoading] = useState(true)
    /** 
    * On recupère user qui se trouve dans notre state 
    * du reducer grace au destructuring
    **/
    const [{user}, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        // on verifie que l'utilisateur n'est pas déjà connecté
        if(user.id === null){
          // on recupere le token dans le localStorage
          const jwtToken = window.localStorage.getItem("jwtToken")
          // Si on a un token
          if (jwtToken) {
            // on met le token 
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
            // on verifie le token puis on sauvegarde les données dans le reducer
            axios.get(`${BASE_URL}/relogged`)
            .then(res => dispatch({type:"LOGIN", payload:res.data.result}))
            .catch(e => console.log(e))
          } else { setLoading(false) }
        }
    },[])
  
    // permet de bloquer le chargement des composent si l'utilisateur n'est pas logged ou que la route est sécurisée
    useEffect(() => { if (user.id || !auth) setLoading(false) },[user, location])
    
    // On récupère les variables qui permettent de savoir si l'utilisateur est connecté et/ou admin
    const {isAdmin, isLogged} = user;
    
    // On verifie si la route est réservée aux admin 
    const isLimitedToAdmin = auth === "admin";
    // On verifie si la route est réservée aux utilisateurs connectés
    const isLimitedToConnected = auth === "user";
    
    // si il n'y a pas de restriction sur cette route
    const isPublic = auth === null
  
    /* 
    * Si la route est reservée aux admins et qu'ils sont connectés en tant qu'admins
    * OU
    * Si la route est reservée aux utilisateurs et qu'ils sont connectés
    */
    const isUserAuthorized = isPublic || (isLimitedToAdmin && isAdmin) || (isLimitedToConnected && isLogged);

    if(loading) return <p>Loading</p>
  
    return isUserAuthorized ? children : <Navigate to="/login" />;
}


export default PrivateRoute