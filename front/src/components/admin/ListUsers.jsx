import axios from "axios"
import {BASE_URL} from '../../tools/constante.js'
import {useEffect, useState} from "react"
import {NavLink} from 'react-router-dom'

const ListUsers = () => {
    const [usersList, setUsersList] = useState([])
    
    useEffect(() => {
        if(usersList.length === 0){
            axios.get(`${BASE_URL}/admin/allUsers`)
                .then(res => setUsersList(res.data.result))
                .catch(err => console.log(err))
        }
    },[])
    
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUserId`,{id})
            setUsersList(usersList.filter(user => user.id !== id))
    }
    
    return(
        <div className="list_user">
            {usersList.map((user,i) => {
                return(
                    <ul className="user" key={i}>
                        <li>Nom:{user.last_name}</li>
                        <li>Prenom:{user.first_name}</li>
                        <li>Email:{user.email}</li>
                        <li>Role:{user.role_id}</li>
                        <button onClick={() => deleteUser(user.id)}>X</button>
                        <NavLink to={`/admin/users/edit/${user.id}`}><button>Modifier</button></NavLink>
                    </ul>
                )
            })}
        </div>    
    )
}

export default ListUsers