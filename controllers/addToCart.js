import { asyncQuery } from "../config/database.js"

export default async(req, res) => {
    const { user_id, product_id, quantity } = req.body
    const checkProductSQL = `SELECT * FROM products WHERE id = ?`
    const checkStockSQL = `SELECT stock FROM products WHERE id = ?`
    const checkCartSQL = `SELECT * FROM cart WHERE user_id = ? AND product_id`
    const addToCartSQL = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)`
    const updateCartSQL = `UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?`
    const checkProduct = await asyncQuery(checkProductSQL, [product_id])

    if (checkProduct.length === 0) {
        return res.json({ error: "Pas de ce type de produit ici" })
    }

    const checkStock = await asyncQuery(checkStockSQL, [product_id])

    if (checkStock[0].stock < quantity) {
        return res.json({ error: "Pas assez de produit en stock pour cette quantitée" })

    }

    const checkCart = await asyncQuery(checkCartSQL, [user_id, product_id])

    if (checkCart.length === 0) {
        const addToCartQuery = await asyncQuery(addToCartSQL, [user_id, product_id, quantity])

        if (addToCartQuery.affectedRows === 1) {
            return res.json({ message: "'Produit ajouté au chariot" })

        }
        else {
            return res.json({ errror: "Le produit n'a pas pu être ajouté au panier" })
        }

    }else{
        const newQuantity = checkCart[0].quantity + quantity
        const updateCartQuery = await asyncQuery(updateCartSQL, [newQuantity, user_id, product_id])
    
        if(updateCartQuery.affectedRows === 1 ){
            return res.json({message: "Update de la quantité des produits du chariot faite"})
        }else{
            return res.json({error: "Update de la quantité dans le chariot n'a pas pu être faite"})
        }
    }

}
