import {pool} from "../config/database.js"

export default (req, res) => {
    let sql = `SELECT * FROM products`
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}