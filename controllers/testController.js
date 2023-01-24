// Exportation d'une fonction par défaut
export default (req, res) => {
    // Envoi d'une réponse en format JSON avec un objet contenant la clé "response" et la valeur "true"
    res.json({response:true})
}