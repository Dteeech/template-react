import { StoreContext } from "../../tools/context.js"
import axios from "axios"
import { BASE_URL } from "../../tools/constante.js"
import { useContext } from "react"

const useCart = (product, userId) => {
    const [state, dispatch] = useContext(StoreContext)

    // Ajouter un produit au panier
    const addToCart = async(product, userId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/addToCart`, {
                    user_id: userId,
                    product_id: product.id,

                })


            dispatch({
                type: "ADD_TO_CART",
                payload: product,
            });
        }
        catch (error) {
            console.log("Une erreur est survenue lors de l'ajout au panier :", error);
        }
    }
    const removeFromCart = async(userId, productId) => {
        console.log(userId, productId)
        try {
            await axios.post(`${BASE_URL}/cart/deleteFromCart`, {
                user_id: userId, 
                product_id: productId
    
            });

            dispatch({
                type: "REMOVE_FROM_CART",
                payload: productId,
            })
        }
        catch (error) {
            console.log("Une erreur est survenue lors de la suppression d'un article du panier :", error);
        }
    }

    const getCart = async(userId) => {
        console.log(userId)
        try {
            const response = await axios.post(`${BASE_URL}/cart/getCart`, { user_id: userId })
            console.log(response)
            dispatch({
                type: "GET_CART",
                payload: response.data.result
            })
        }
        catch (error) {
            console.log("erreur de la récupération du panier")
        }
    }

    return {

        addToCart,
        removeFromCart,
        getCart
    }

}

export default useCart;
