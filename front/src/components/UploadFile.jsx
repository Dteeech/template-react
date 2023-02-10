import {Fragment} from 'react'
import {BASE_URL} from "../tools/constante.js"
import axios from 'axios'
// import {AppContext} from './reducer/reducer.js'

const UploadFile = () => {
    // const [state, dispatch] = useContext(AppContext)
    
    // Submit du formulaire
    const submit = (e) => {
        e.preventDefault()
        
        // Nom d'utilisateur
        const username = "Pseudo"
        
        // Initialisation d'un objet FormData pour envoyer les données du formulaire
        const dataFile = new FormData();
        
        // Récupération des fichiers envoyés dans le formulaire
        const files = {...e.target.avatar.files};
        
        // Affichage des fichiers dans la console
        console.log(files)
        
        // Ajout du nom d'utilisateur à l'objet FormData
        dataFile.append('username', username)
        
        // Ajout de la première image de la liste de fichiers à l'objet FormData
        dataFile.append('files', files[0], files[0].name)
        
        // Envoi de la requête à l'URL de téléchargement de fichier avec les données du formulaire
        axios.post(`${BASE_URL}/uploadFile`, dataFile)
            .then((res)=> {
                // Affichage de la réponse dans la console
                console.log(res)
                
                // Vérification de la réponse pour savoir si le téléchargement a été effectué avec succès
                res.data.response && console.log('succesfully upload');
            })
            .catch((err) => {
                // Affichage de l'erreur dans la console en cas d'échec de la requête
                console.log(err)
            })
    } 
    
    // Retourne un formulaire pour télécharger un fichier
    return (
        <Fragment>
            <h1>Ajouter/Modifier l'avatar</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='avatar'>
                    <input type='file' name='avatar'/>
                    <input type='submit' value='Submit'/>
                </label>
            </form>
        </Fragment>
    )
}

export default UploadFile
