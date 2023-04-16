// Importations des modules et des fichiers nécessaires
import { BASE_URL } from '../tools/constante.js'
import { useEffect, useState, Fragment, useContext } from "react"
import { StoreContext } from "../tools/context.js"
import UserIsLogged from "./UserIsLogged.jsx"
import ModalConfirmDelete from "./ModalConfirmDelete.jsx"
import axios from 'axios'
import { useParams, NavLink, Navigate } from "react-router-dom"

// Composant UserMyAccount
const UserMyAccount = () => {
    const [state, dispatch] = useContext(StoreContext) // Utilisation du hook useContext pour accéder au contexte global
    const [openModal, setOpenModal] = useState(false) // Utilisation du hook useState pour la modale de confirmation
    const [userInfos, setUserInfos] = useState('') // Utilisation du hook useState pour stocker les informations utilisateur
    const { userId } = useParams() // Utilisation de useParams pour récupérer l'ID utilisateur depuis l'URL
    const [isLoading, setIsLoading] = useState(true) // Utilisation du hook useState pour la gestion de l'état de chargement

    // Gestionnaire de changement pour la mise à jour des champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfos({ ...userInfos, [name]: value })
        console.log(userInfos)
    }

    // Utilisation du hook useEffect pour récupérer les informations de l'utilisateur en fonction de son ID
    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getUserId`, { id: userId })
            .catch(err => console.log(err))
            .then(res => {
                const data = res.data.result[0]
                setUserInfos(data)
            })
            .then(res => setIsLoading(false))
    }, [userId])

    // Gestionnaire de soumission pour la mise à jour des informations utilisateur
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/editUserById`, {
                id: userInfos.id,
                last_name: userInfos.last_name,
                first_name: userInfos.first_name,
            })
            .catch(err => console.log(err))
            .then(res => {
                console.log(res)
                console.log(userInfos)
                alert("vos informations ont bien étés changées")
            })
    }

    // Affichage du message de chargement si l'état de chargement est vrai
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Fragment>
            <div className="form_container my_account">
                <form className="form" onSubmit={handleSubmit}>
                    <input type='text' name='first_name' 
                    placeholder='nom' onChange={handleChange} 
                    value={userInfos.first_name} />
                    
                    <input type='text' 
                    name='last_name'
                    placeholder='prenom' 
                    onChange={handleChange} 
                    value={userInfos.last_name} />
                    
                    <button type="button"className="delete" onClick={() => setOpenModal(true)}> supprimer le compte </button>
                    <button onClick={() => handleSubmit()}>Modifier</button>
                </form>
                
                {state.user.isLogged ?
                (<UserIsLogged />)
                
                : (<a href="/login">Se connecter</a>)}
                {openModal && <ModalConfirmDelete closeModal={setOpenModal} userId={userId}/>}
            </div>
            
        </Fragment>
    )

}

export default UserMyAccount
