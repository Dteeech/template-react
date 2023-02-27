import {pool} from "../../config/database.js"

export default (req, res) => {
    let sql = `SELECT products.*, pictures.url, pictures.caption 
FROM products
LEFT JOIN pictures ON products.id = pictures.products_id;`
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}