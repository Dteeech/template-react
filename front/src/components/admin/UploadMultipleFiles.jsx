import { Fragment, useState } from 'react'
import { BASE_URL } from "../tools/constante.js"
import axios from 'axios'

// import {AppContext} from './reducer/reducer.js'

const UploadMultipleFiles = () => {
    // const [state, dispatch] = useContext(AppContext)
    const [name, setName] = useState("test")
    const [pictures, setPictures] = useState(null)
    const [pictureSelected, setPictureSelected] = useState(null)

    const submit = (e) => {
        e.preventDefault()
        const dataFile = new FormData();
        const files = [...e.target.avatar.files];

        console.log(files)

        // ajouter d'autre input au formulaire
        dataFile.append('name', name)

        // ajouter tous les fichiers à FormData
        for (let i = 0; i < files.length; i++) {
            dataFile.append('files', files[i], files[i].name)
        }
        axios.post(`${BASE_URL}/uploadFile`, dataFile)
            .then((res) => {
                setPictures(res.data.result)
                console.log(res)
                res.data.response && console.log('succesfully upload');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const submitMainPicture = () => {
        const urlPicture = pictures[pictureSelected]
        console.log(urlPicture)
        // appel axios
    }

    return (
        <Fragment>
            {!pictures &&(
                <Fragment>
                    <h1>Ajouter/Modifier l'avatar</h1>
                    <form onSubmit={submit} encType="multipart/form-data">
                        <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                        <label name='avatar'>
                            <input type='file' name='avatar' multiple/>
                        </label>
                        <input type='submit' value='Submit'/>
                    </form>
                </Fragment>
            )}
            {pictures &&
                <Fragment>
                    {pictures.map((e,i) => {
                        return (<img onClick={() => setPictureSelected(i)} src={`${BASE_URL}/img/${e}`}/>)
                    })}
                    <button onClick={submitMainPicture}>Valider</button>
                </Fragment>
            }
            </Fragment>
    )
}

export default UploadMultipleFiles
