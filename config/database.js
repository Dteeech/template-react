// Importation du module mysql
import mysql from "mysql";

// Création d'un groupe de connexions pour la base de données MySQL
export let pool  = mysql.createPool({
    connectionLimit : 10000, // Nombre maximum de connexions pouvant être maintenues dans le pool
    host: "db.3wa.io", // Adresse de l'hôte où se trouve la base de données
    user: "anthonycarreta", // Identifiant pour se connecter à la base de données
    password: "acfff451642c9b6988a8a36616c1ba28", // Mot de passe pour se connecter à la base de données
    database: "anthonycarreta_projetNode", // Nom de la base de données à laquelle se connecter
});
