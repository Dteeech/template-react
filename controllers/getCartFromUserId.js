import { asyncQuery } from "../config/database.js"

export default async(req, res) => {
    const { user_id } = req.body

    const sql = `SELECT cart.*, products.name, products.price, products.category_id,pictures.url
                FROM cart
                JOIN products ON cart.product_id = products.id
                JOIN pictures ON pictures.products_id = products.id
                WHERE cart.user_id = ?` // on récupère le product_id et le cart_id ou l'user id = ?
    try {
        const data = await asyncQuery(sql, [user_id])
        res.json({result:data})
    } catch(e) {
        res.json({error:e})
    }
}