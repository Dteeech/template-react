// 
import { BASE_URL } from '../tools/constante.js'
import { useEffect, useState, Fragment, useContext } from "react"
import UserIsLogged from "./UserIsLogged.jsx"
import Nav from "./Nav.jsx"
import { StoreContext } from "../tools/context.js"
import axios from 'axios'
import { useParams, NavLink, Navigate } from "react-router-dom"


const UserMyAccount = () => {
    const [state, dispatch] = useContext(StoreContext)
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



    const submit = (e) => {
        e.preventDefault()
        console.log(userInfos)
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

    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUserId`, { id })

            .catch(err => console.log(err))
            .then(res => {
                console.log(res)
                localStorage.removeItem('jwtToken')//suppression du token
                dispatch({ type: "LOGOUT" })//envoi au reducer
                delete axios.defaults.header.common['Authorization']
            })


    }


    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Fragment>
            <Nav />
            <div className="form_container my_account">
                <form className="form" onSubmit={submit}>
                    <input type='text' name='first_name' 
                    placeholder='nom' onChange={handleChange} 
                    value={userInfos.first_name} />
                    
                    <input type='text' 
                    name='last_name'
                    placeholder='prenom' 
                    onChange={handleChange} 
                    value={userInfos.last_name} />
                    
                    <button className="delete" onClick={() => deleteUser(userId)}> supprimer le compte </button>
                    <input type='submit' value="Modifier" />
                </form>
                
                {state.user.isLogged ?
                (<UserIsLogged />)
                
                : (<a href="/login">Se connecter</a>)}
            </div>
        
        </Fragment>
    )

}

export default UserMyAccount
