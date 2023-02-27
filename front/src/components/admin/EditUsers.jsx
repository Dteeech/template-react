import { useParams } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../tools/constante.js"
import { useState, useEffect, Fragment } from "react"

const EditUsers = () => {
    const { userId } = useParams();
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getUserId`, { id: userId })
            .catch(err => console.log(err))
            .then(res => {
                console.log(res)

                const data = res.data.result[0]
                setUser(data)
            })
            .then(res => setIsLoading(false))

    }, [userId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }


    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUserId`, { id })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }


    const submit = (e) => {
        e.preventDefault()
        console.log(user)
        axios.post(`${BASE_URL}/admin/editInfosUser`, {
                id: user.id,
                role_id: user.role_id,
                first_name: user.first_name,
                last_name: user.last_name

            })
            .catch(err => console.log(err))
            .then(res => {
                console.log(res)
                console.log(user)
            })

    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Fragment>
               
                <form onSubmit={submit}>
                    <input type='text' name='first_name' placeholder='Nouveau prénom' onChange={handleChange} value={user.first_name} />
                    
                    <input type='text' name='last_name' placeholder='Nouveau nom' onChange={handleChange} value={user.last_name} />
                    
                    <select  name='role_id' onChange={handleChange} value={user.role_id}>
                        <option value='1'>Admin</option>
                        <option value='2'>User</option>
                    </select>
                    <input type='submit' />
                    <button to="/" onClick = {() => deleteUser(user.id)}>Supprimer</button>
                </form>
               
            </Fragment>

    )


}

export default EditUsers
