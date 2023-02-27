import { pool } from "../../config/database.js"
import deleteFile from "../../config/deleteFile.js"
import path from 'path';

export default async (req, res) => {
    const { id, url } = req.body;
    console.log(url)
    const fileName = path.basename(url);
    console.log(req.body);
    const sql = "DELETE FROM products WHERE id = ?";
    const paramsSQL = [id];
    pool.query(sql, paramsSQL, async (err, result) => {
        if (err) throw err;
        
        try {
            await deleteFile(fileName);
            res.json({ result });
        } catch (error) {
            console.error(`Failed to delete file '${fileName}'`, error);
            throw error;
        }
    });
};
