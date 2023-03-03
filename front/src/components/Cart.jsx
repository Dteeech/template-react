import { StoreContext } from "../tools/context.js"
import axios from "axios"
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import useCart from "./Hooks/useCart.jsx"
import { useContext, useState, useEffect } from "react"

const Cart = () => {
    const {addToCart, removeFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const [state, dispatch] = useContext(StoreContext)
    const user_id = state.user.id
    
    
    useEffect(() => {
        let price = 0;
        state.cart.forEach((product) => {
            price += product.price * product.quantity;
        });
        setTotalPrice(price);
    }, [state.cart]);

    const handleIncrement = (product) => {
        console.log('Handle Increment :', product); // Console log pour id
        addToCart(product);
    }

    const handleDecrement = (product) => {
        console.log('Handle Decrement :', product); // Console log pour id
        if (state.cart[product.id].quantity === 1) {
            removeFromCart(product.id);
        }
        else {
            addToCart(product.id, -1, user_id);
        }
    }

    const handleCheckout = () => {
        
        console.log("Commande acceptée !");
    }


    return (
        <div>
        <h1>Panier</h1>
        <ul>
            {state.cart.map((product) => {
            console.log(product)
                return (
                    <li key={product.id}>
                        <img src={`${BASE_IMG}/${product.url}`} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price}€</p>
                        <div>
                            <button onClick={() => handleIncrement(product)}>+</button>
                            <span>{product.quantity}</span>
                            <button onClick={() => handleDecrement(product)}>-</button>
                        </div>
                    </li>
                )
            })}
        </ul>
        <p>Total : {totalPrice}€</p>
        <button onClick={handleCheckout}>Commander</button>
    </div>
    )
}

export default Cart;