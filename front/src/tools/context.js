// Importation de React
import React from "react"

// Création d'un contexte de store (magasin)
const StoreContext = React.createContext([]);

// Initialisation de l'état du store (magasin)
const initialState = {
    count : 0, // Compteur
    data : [] // Données
}

// Exportation du contexte de store (magasin) et de l'état initial
export {StoreContext, initialState}