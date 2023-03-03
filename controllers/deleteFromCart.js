import { asyncQuery } from "../config/database.js"

export default async(req, res) => {
    const { user_id, product_id } = req.body
    const sql = `DELETE FROM cart WHERE user_id = ? AND product_id = ?`
    try {
        const paramsSQL = [user_id, product_id]
        const deleteFromCart = await asyncQuery(sql, paramsSQL)
        if (deleteFromCart.affectedRows === 1) {
            return res.json({ message: 'Produit retiré du panier avec succès' })
        }
        else {
            return res.status(404).json({ error: 'Produit non trouvé dans le panier' })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Une erreur s'est produite lors du processus de suppression du chariot" })
    }
}