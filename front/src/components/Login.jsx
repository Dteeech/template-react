import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../tools/constante.js"
import { Fragment } from "react"
import { NavLink } from "react-router-dom"
import { lengthLimit, checkVide } from "../tools/maxLength.js"
import { StoreContext } from "../tools/context.js"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const Login = () => {
    // Déclaration d'un objet "initialState" pour stocker les valeurs par défaut des champs "email" et "password"
    const initialState = { email: '', password: '' }
    const [state, dispatch] = useContext(StoreContext);

    // Déclaration d'un état "info" avec la valeur initiale "initialState"
    // et d'une fonction "setInfo" pour mettre à jour cet état
    const [info, setInfo] = useState(initialState)
    const [messErr, setMessErr] = useState("")
    // Fonction pour gérer les changements dans les champs "email" et "password"
    const handleChange = (e) => {

        setMessErr("")
        if (!lengthLimit(e.target.value, 250)) {
            alert('erreur ne doit pas dépasser 250')
            return
        }
        // Récupération du nom et de la valeur de l'input actuellement modifié
        const { name, value } = e.target
        // Mise à jour de l'état "info" avec la nouvelle valeur
        setInfo({ ...info, [name]: value })
    }

    // Fonction pour soumettre les données de connexion lorsque le formulaire est soumis
    const submit = (e) => {
        // Annulation de l'événement par défaut pour empêcher le rechargement de la page
        e.preventDefault()
        if (!checkVide(info)) {
            alert("le champ ne peut pas être vide")
            return
        }
        // Envoi de la requête POST à l'URL de connexion avec les données "email" et "password"


        axios.post(`${BASE_URL}/login`, { password: info.password, email: info.email })

            .then(res => {


                setMessErr(res.data.response)
                if (res.data.response.response) {
                    console.log(res.data.response.userData)
                    dispatch({ type: "LOGIN", payload: res.data.response.userData })
                    localStorage.setItem('jwtToken', res.data.response.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.response.token
                    //    console.log(res)
                    // Réinitialisation des valeurs du formulaire
                    setInfo(initialState)
                }

            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    setMessErr('identifiant ou mot de passe incorrect')
                }
            })
    }
    console.log(state)
    // Rendu du formulaire de connexion avec les inputs "email" et "password"
    // et la soumission du formulaire déclenchée par la fonction "submit"
    return (
  <Fragment>
    {state.user.isLogged ? (
      state.user.role_id === 1 ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div className="connect">
          <p>se connecter</p>
          <form onSubmit={submit}>
            <input
              type="text"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="email"
            />
            <input
              type="password"
              name="password"
              value={info.password}
              onChange={handleChange}
              placeholder="password"
            />
            <input type="submit" />
          </form>
          {messErr.length > 0 && <p>{messErr}</p>}
          <div>
            <p>Pas encore de compte ? </p>
            <NavLink to="/register">S'enregistrer</NavLink>
          </div>
          <NavLink to="/">Accueil</NavLink>
        </div>
      )
    ) : (
      <div className="connect">
        <p>se connecter</p>
        <form onSubmit={submit}>
          <input
            type="text"
            name="email"
            value={info.email}
            onChange={handleChange}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            value={info.password}
            onChange={handleChange}
            placeholder="password"
          />
          <input type="submit" />
        </form>
        {messErr.length > 0 && <p>{messErr}</p>}
        <div>
          <p>Pas encore de compte ? </p>
          <NavLink to="/register">S'enregistrer</NavLink>
        </div>
        <NavLink to="/">Accueil</NavLink>
      </div>
    )}
  </Fragment>
);}

export default Login
