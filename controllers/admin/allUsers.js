import {pool} from "../../config/database.js"

export default (req, res) => {
    let sql = "SELECT id, first_name, last_name, email, role_id FROM users"
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}