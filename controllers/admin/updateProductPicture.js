import { pool } from "../../config/database.js"
import deleteFile from "../../config/deleteFile.js"
import path from "path"

export default async(req, res) => {


    const { files, url, products_id } = req.body

    console.log(req.body)

    const fileName = path.basename(files)
    const sql = "UPDATE pictures SET url= ? WHERE products_id = ? "
    const paramsSQL = [files, products_id]

    pool.query(sql, paramsSQL, async(err, result) => {
        if (err) throw err

        try {
            const data = await result.affectedRows
            console.log(data)
            if (data > 0) {
                await deleteFile(url)
            }
            
            res.json({ result, url:files })
        }
        catch (error) {
            console.error(`failed to delete file ${fileName}`, error)
            res.json({error})
        }

    })
}
