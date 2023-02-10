import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {Fragment} from "react"
import {NavLink} from "react-router-dom"

const Login = () => {
    // Déclaration d'un objet "initialState" pour stocker les valeurs par défaut des champs "email" et "password"
    const initialState = {email:'',password:''}

    // Déclaration d'un état "info" avec la valeur initiale "initialState"
    // et d'une fonction "setInfo" pour mettre à jour cet état
    const [info, setInfo] = useState(initialState)

    // Fonction pour gérer les changements dans les champs "email" et "password"
    const handleChange = (e) => {
        // Récupération du nom et de la valeur de l'input actuellement modifié
        const {name,value} = e.target
        // Mise à jour de l'état "info" avec la nouvelle valeur
        setInfo({...info, [name]:value})
    }
    
    // Fonction pour soumettre les données de connexion lorsque le formulaire est soumis
    const submit = (e) => {
        // Annulation de l'événement par défaut pour empêcher le rechargement de la page
        e.preventDefault()
        // Envoi de la requête POST à l'URL de connexion avec les données "email" et "password"
        axios.post(`${BASE_URL}/login`,{password:info.password, email:info.email})
            .then(res => {
                // Si la réponse est positive (res.data.response.response est "true"),
                // enregistrement du token JWT dans le local storage
                // et définition de l'en-tête "Authorization" pour les requêtes ultérieures
                console.log(res.data)
                if(res.data.response.response) {
                    localStorage.setItem('jwtToken', res.data.response.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                    console.log(res)
                    // Réinitialisation des valeurs du formulaire
                    setInfo(initialState)
                }
            })
    }
    
    // Rendu du formulaire de connexion avec les inputs "email" et "password"
    // et la soumission du formulaire déclenchée par la fonction "submit"
    return(
        <Fragment>
            <div className ="connect">
            
                <p>se connecter</p>
                <form onSubmit={submit}>
                    <input type='text' name='email' value={info.email} onChange={handleChange} placeholder='email' />
                    <input type='password' name='password' value={info.password} onChange={handleChange} placeholder='password' />
                    <input type="submit" />
                </form>
            </div>
            <div>
                <p>Déjà un compte ? </p>
                <NavLink to="/addUser">
                    S'enregistrer
                </NavLink>
            </div>
        </Fragment>
    )
}

export default Login
