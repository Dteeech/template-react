import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState} from "react"
// fonction de vérification de nombre de caractères
import {lengthLimit, checkVide} from "../tools/maxLength.js"

const AddUser = () => {
    const [userData, setUserData] = useState({
        last_name:'',
        first_name:'',
        email:'',
        password:''
    })
    
    const handleChange = (e) => {
        //on appelle la fonction validateForm
        if(!lengthLimit(250,[e.target.value])){
            alert('erreur ne doit pas dépasser 250')
            return
        }
        const {name, value} = e.target
        setUserData({...userData,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        const trimmedFormData = {
            
          last_name: userData.last_name.trim(),
          first_name: userData.first_name.trim(),
          email: userData.email.trim(),
          password: userData.password.trim()
        }
         
        
        if(!checkVide(Object.values(userData))){
            alert('le champ ne peut pas être vide')
            return
        }
        axios.post(`${BASE_URL}/addUser`,{
           last_name : userData.last_name,
           first_name: userData.first_name,
           email: userData.email,
           password: userData.password
       })
    }
    
    
    return(
        
        <form onSubmit={submit}>
            <input type='text' placeholder='nom' name='last_name' onChange={handleChange} value={userData.last_name} />
            <input type='text' placeholder='prenom' name='first_name' onChange={handleChange} value={userData.first_name} />
            <input type='email' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
            <input type='password' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
            <input type='submit' />
        </form>    
    )
}

export default AddUser