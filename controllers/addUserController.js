import { asyncQuery } from "../config/database.js" // Importation de la connexion à la base de données en mode asynchrone
import bcrypt from 'bcrypt' // Importation du module bcrypt pour le hashage du mot de passe

const emailExist = async(email) => {
    
    // Requête SQL qui récupère toutes les données de l'utilisateur où l'e-mail est égal à l'e-mail passé en paramètre
    const sql = "SELECT * FROM users WHERE email = ?"

    const response = await asyncQuery(sql, [email]) // Exécution de la requête asynchrone
    if (response.length > 0) return true // Si la réponse contient des données, cela signifie que l'e-mail existe déjà en BDD, on retourne true
    return false // Sinon, l'e-mail n'existe pas, on retourne false
}

export default async(req, res) => {
    const saltRounds = 10 // Nombre de tours de l'algorithme de hashage bcrypt
    const { first_name, last_name, email, password } = req.body // Récupération des données de la requête POST

    const sql = "INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (?,?,?,?,?)" // Requête SQL pour ajouter l'utilisateur à la BDD

    if (password.length <= 8 && password.length > 250) { // Vérification de la longueur du mot de passe
        return { response: 'mdp trop court' } // Si la longueur est incorrecte, on retourne une erreur
    }

    try {
        // On vérifie si l'e-mail existe déjà en BDD
        const emailPresent = await emailExist(email)

        // Erreur lors de la vérification de l'e-mail
        if (emailPresent === undefined) {
            return alert("Cette adresse mail n'existe pas") // On affiche une alerte pour avertir l'utilisateur

        }

        // E-mail déjà présent en BDD 
        if (emailPresent === true) {
            return { response: 'email deja present' } // On retourne une erreur si l'e-mail est déjà présent
        }

        // On hash le mot de passe avec bcrypt
        const mpdHash = await bcrypt.hash(password, saltRounds)

        // On crée la liste des paramètres pour ajouter l'utilisateur à la BDD
        const paramsSql = [first_name, last_name, email, mpdHash, 2]

        // On exécute la requête SQL pour ajouter l'utilisateur à la BDD
        const createUser = await asyncQuery(sql, paramsSql)

        // On retourne la réponse JSON avec la confirmation de l'ajout de l'utilisateur à la BDD
        return res.json({ response: createUser })
    }
    catch (err) {
        console.log(err) // On consigne l'erreur dans la console
        return // On ne retourne rien si une erreur est survenue
    }

}