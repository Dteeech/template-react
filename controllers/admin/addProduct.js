import { asyncQuery } from "../../config/database.js"

export default async(req, res) => {
    const { name, type_id, price, category_id, files } = req.body
    const sql = `INSERT INTO products (name, type_id, price, category_id) 
                VALUES (?, ?, ?, ?)`
    try {
        const paramsSQL = [name, type_id, price, category_id]
        console.log(paramsSQL)
        const createProduct = await asyncQuery(sql, paramsSQL)
        const products_id = createProduct.insertId
        const pictureSQL = `INSERT INTO pictures (products_id, url, caption) 
            VALUES (?, ?, ?)`
        const pictureParams = [products_id, files, name]
        const createPicture = await asyncQuery(pictureSQL, pictureParams)
        if (createPicture.affectedRows === 1) {
            return res.json({ response: createProduct })
        }
        else {
            return res.status(500).json({ error: 'Failed to add picture to database' })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Failed to create product' })
    }
}
