// Importation du module mysql
import mysql from "mysql";

// Création d'un groupe de connexions pour la base de données MySQL
export let pool  = mysql.createPool({
    connectionLimit : 10000, // Nombre maximum de connexions pouvant être maintenues dans le pool
    host: "db.3wa.io", // Adresse de l'hôte où se trouve la base de données
    user: "isaacmarshall", // Identifiant pour se connecter à la base de données
    password: "05a91eae8f06121c7e051e8cfe6fd6bb", // Mot de passe pour se connecter à la base de données
    database: "isaacmarshall_projet", // Nom de la base de données à laquelle se connecter
});

// permet d'obtenir le resultat des requete sql async
export const asyncQuery = async (sql, params = []) => {
    return new Promise((resolve, reject)=>{
        pool.query(sql,params, (error, result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}