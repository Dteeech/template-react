// 
import { BASE_URL } from '../tools/constante.js'
import { useEffect, useState, Fragment, useContext } from "react"
import { StoreContext } from "../tools/context.js"
import UserIsLogged from "./UserIsLogged.jsx"
import ModalConfirmDelete from "./ModalConfirmDelete.jsx"
import Nav from "./Nav.jsx"
import axios from 'axios'
import { useParams, NavLink, Navigate } from "react-router-dom"


const UserMyAccount = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [openModal, setOpenModal] = useState(false)
    const [userInfos, setUserInfos] = useState('')
    const { userId } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfos({ ...userInfos, [name]: value })
        console.log(userInfos)
    }

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
                //afficher un message
            })
    }

   

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Fragment>
            <Nav />
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
