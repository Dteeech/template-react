import { asyncQuery } from "../config/database.js"

export default async(req, res) => {
    const { user_id } = req.body

    const sql = "DELETE FROM cart WHERE user_id = ?"
    const paramsSQL = [user_id]
    try {
        const clearCart = await asyncQuery(sql, paramsSQL)
        res.json({ message: "Le panier a été vidé" })

    }
    catch (err){
        console.log("Une erreur est survenue lors de suppression du panier", err)
    }
}