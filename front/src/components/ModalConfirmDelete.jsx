import React from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { StoreContext } from "../tools/context.js"


const ModalConfirmDelete = ({ closeModal, userId }) => {
    
const [state, dispatch] = React.useContext(StoreContext)    

    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUserId`, { id })

            .catch(err => console.log(err))
            .then(res => {
                console.log(res)
                localStorage.removeItem('jwtToken')//suppression du token
                dispatch({ type: "LOGOUT" })//envoi au reducer
                delete axios.defaults.header.common['Authorization']
            })

    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="titleCloseBtn" >
                <button onClick={() => closeModal(false)}> X </button>
            </div>
                <div className="modalTitle">
                    <h1>Etes vous sur de vouloir supprimer votre compte ?</h1>
                </div>
                <div className="modalBody">
                </div>
                <div className="modalFooter">
                    <button onClick={() => closeModal(false)}>Annuler</button>
                    <button onClick={() => deleteUser(userId)}>Confirmer</button>
                </div>
            </div>
        </div>
    )

}

export default ModalConfirmDelete