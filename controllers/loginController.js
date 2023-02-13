// Importation de la fonction asyncQuery du fichier database.js
import { asyncQuery } from "../config/database.js"

// Importation de la bibliothèque bcrypt
import bcrypt from "bcrypt"

// Importation de la fonction generateToken du fichier token.js
import { generateToken } from "../config/token.js"

// Définition d'une fonction qui génère une réponse pour un utilisateur
const generateResponse = async (userDataSQL) => {
  console.log(userDataSQL)
  // ID du rôle Admin dans la base de données
  const ADMIN_ROLE_ID = 1

  // Vérifie si l'utilisateur est un administrateur et définit un drapeau en conséquence
  const admin = userDataSQL.role_id === ADMIN_ROLE_ID

  // Création d'un objet avec les données de l'utilisateur
  const userData = {
    id: userDataSQL.id,
    role_id: userDataSQL.role_id,
    last_name: userDataSQL.last_name,
    first_name: userDataSQL.first_name,
    email: userDataSQL.email,
    user: true,
    admin
  }

  try {
    // Génération d'un token pour l'utilisateur
    const token = await generateToken(userData)
    

    // Retourne la réponse avec le token et le drapeau admin
    return { response: true, admin, token, userData }
  } catch (err) {
    console.log(err)
    return
  }
}

// Exportation d'une fonction par défaut qui gère l'authentification de l'utilisateur
export default async (req, res) => {
  // Extraction du mot de passe et de l'email du corps de la requête
  const { password, email } = req.body
  console.log(email)
  

  // Requête SQL pour récupérer les données de l'utilisateur
  const sql = "SELECT * FROM users WHERE email = ?"

  // Paramètres pour la requête SQL
  const paramsSql = [email]

  try {
    // Exécution de la requête SQL
    const result = await asyncQuery(sql, paramsSql)
    if(result.length === 0 ){
     return res.json({response : "information erronée"})
     
    }
    console.log(result)
    // Génération d'une réponse pour l'utilisateur
    const response = await generateResponse(result[0])

    // Comparaison du mot de passe entré avec le mot de passe haché dans la base de données
    const resultCompare = await bcrypt.compare(password, result[0].password)

    // Retourne la réponse si le mot de passe est correct, sinon une erreur
    res.json(resultCompare ? { response } : { response: "information erronée" })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
