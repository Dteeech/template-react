import { StoreContext } from "../../tools/context.js"
import axios from "axios"
import { BASE_URL, BASE_IMG } from "../../tools/constante.js"
import { useContext } from "react"

const useCart = () => {
    const [ state, dispatch ] = useContext(StoreContext)

    // Ajouter un produit au panier
    const addToCart = async(productId, quantity) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/cart/addToCart`, {
                    product_id: productId,
                    quantity,
                }
            )

            dispatch({
                type: "ADD_TO_CART",
                payload: response.data,
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
        cart: state.cart,
        addToCart,
        removeFromCart,
    }

}

export default useCart;
