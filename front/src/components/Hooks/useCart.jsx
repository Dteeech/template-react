import { StoreContext } from "../../tools/context.js"
import axios from "axios"
import { BASE_URL, BASE_IMG } from "../../tools/constante.js"
import { useContext } from "react"

const useCart = (product, quantity, userId) => {
    const [ state, dispatch ] = useContext(StoreContext)

    // Ajouter un produit au panier
    const addToCart = async(product, quantity, userId) => {
        console.log(product)
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/addToCart`, {
                    user_id: userId,
                    product_id: product.id,
                    quantity,
                }
            )
            
            product.quantity = quantity

            dispatch({
                type: "ADD_TO_CART",
                payload: product,
            });
        }
        catch (error) {
            console.log("Une erreur est survenue lors de l'ajout au panier :", error);
        }
    }

    const removeFromCart = async(cartItemId) => {
        try {
            await axios.post(`${BASE_URL}/cart/deleteFromCart`, { cartItemId });

            dispatch({
                type: "REMOVE_FROM_CART",
                payload: cartItemId,
            })
        }
        catch (error) {
            console.log("Une erreur est survenue lors de la suppression du panier :", error);
        }
    }

    return {
       
        addToCart,
        removeFromCart,
    }

}

export default useCart;
