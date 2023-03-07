import { pool } from "../../config/database.js"

export default async(req, res) => {
    const { id, name, type_id, price, category_id, files } = req.body

    console.log(files)
    try {

        const sql = "UPDATE products SET name = ?, type_id = ?, price = ?, category_id = ? WHERE id = ?"
        const paramsSQL = [name, type_id, price, category_id, id]
        pool.query(sql, paramsSQL, (err, result) => {
            if (err) throw err
            res.json({ result })
            console.log(result)
        })
    }

catch (err) {
    console.log(err)
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du produit" })
    return
}}
