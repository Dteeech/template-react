// Importation des modules nécessaires
import express from "express" // Express.js est utilisé pour créer et gérer des routes de l'application
import cors from "cors" // CORS permet de gérer les requêtes d'origine croisée
import bodyParser from "body-parser" // Ce module permet de parser le corps de la requête et de le rendre disponible dans l'objet de requête
import router from "./routes/routes.js"; // Importation des routes définies dans un fichier séparé

// Initialisation du serveur Express.js
const app = express()
app.use(cors()) // Utilisation de la gestion des requêtes d'origine croisée
app.use(bodyParser.json()); // Utilisation du parseur de corps pour les requêtes en format JSON
app.use(bodyParser.urlencoded({ extended:true })); // Utilisation du parseur de corps pour les requêtes encodées en URL
app.use(express.static("public")); // Utilisation de la gestion des fichiers statiques pour les fichiers dans le répertoire "public"

app.use("/", router); // Utilisation des routes définies dans le fichier "routes.js"

// Démarrage du serveur sur le port 3001
app.listen(3001, () => {
    console.log("le server est démarré à https://retro-games.onrender.com")
})
