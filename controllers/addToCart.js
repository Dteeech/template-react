import { asyncQuery } from "../config/database.js"

export default async(req, res) => {
    const { user_id, product_id } = req.body
    const checkProductSQL = `SELECT * FROM products WHERE id = ?`
    const checkCartSQL = `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`
    const addToCartSQL = `INSERT INTO cart (user_id, product_id) VALUES (?,?)`
    const checkProduct = await asyncQuery(checkProductSQL, [product_id])

    if (checkProduct.length === 0) {
        return res.json({ error: "Pas de ce type de produit ici" })
    }
    console.log({user_id, product_id})
    const checkCart = await asyncQuery(checkCartSQL, [user_id, product_id])

    if (checkCart.length === 0) {
        const addToCartQuery = await asyncQuery(addToCartSQL, [user_id, product_id])

        if (addToCartQuery.affectedRows === 1) {
            return res.json({ message: "'Produit ajouté au chariot" })

        }
        else {
            return res.json({ errror: "Le produit n'a pas pu être ajouté au panier" })
        }
        
    }
    return res.json({error:"global error"})
}
