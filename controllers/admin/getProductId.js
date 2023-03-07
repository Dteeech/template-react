import {pool} from "../../config/database.js"

export default (req, res) => {
    const {id} = req.body
    
    const sql =`SELECT p.*, pic.url, pic.caption
                FROM products p
                LEFT JOIN pictures pic ON p.id = pic.products_id
                WHERE p.id = ?`
    const paramsSQL = [id]
    pool.query(sql,paramsSQL,(err, result) => {
        if(err) throw err
        res.json({result})
    })
}