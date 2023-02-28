import pool from "../config/database.js";

export default (req, res) => {
  const type_id = req.query.type_id; // récupère la valeur de type_id dans les paramètres de requête

  let sql = `SELECT * FROM products`;
  let whereClause = '';

  // si type_id est défini, on ajoute une condition WHERE pour sélectionner les produits du type correspondant
  if (type_id) {
    whereClause = ` WHERE type_id = ?`;
  }

  sql += whereClause;

  pool.query(sql, type_id, (err, result) => {
    if (err) throw err;
    res.json({ result });
  });
};
