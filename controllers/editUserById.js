import {pool} from "../config/database.js"

export default async (req, res) => {
    const {first_name, last_name, id} = req.body
    try {
        
        const sql = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?"
        const paramsSQL = [first_name, last_name, id]
        pool.query(sql,paramsSQL,(err, result) => {
            if(err) throw err
            res.json({result})
        })
        
    } catch(err) {
        console.log(err)
        return
    }
}