import { asyncQuery } from "../config/database.js"
import bcrypt from 'bcrypt'

const getUserById = async(id) => {
    const sql = "SELECT * FROM users WHERE id = ?"
    const response = await asyncQuery(sql, [id])
    if (response.length > 0) return response[0]
    return false
}

export default async(req, res) => {
    const saltRounds = 10
    const { first_name, last_name, email, password, id } = req.body
    const sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?"

    if (password.length <= 8 && password.length > 250) {
        return { response: 'mdp trop court' }
    }

    try {
        // on recupere les données de l'user
        const user = await getUserById(id)

        // error a la verrification de l'user
        if (user === undefined) {
            return
        }

        // User introuvable en BDD 
        if (user === false) {
            return { response: 'utilisateur introuvable' }
        }

        // On hash le password
        const mpdHash = await bcrypt.hash(password, saltRounds)

        // on creer la liste des params pour update user
        const paramsSql = [first_name, last_name, email, mpdHash, id]

        // on fait la requete
        const updateUser = await asyncQuery(sql, paramsSql)

        // on retourn la reponse
        return res.json({ response: updateUser })
    }
    catch (err) {
        console.log(err)
        return
    }
}
