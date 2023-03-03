import { StoreContext } from "../tools/context.js"
import axios from "axios"
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import useCart from "./Hooks/useCart.jsx"
import { useContext, useState } from "react"

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    const handleIncrement = (id) => {
    console.log('Handle Increment :', id); // Console log pour id
    addToCart(id, 1);
    setTotalPrice(totalPrice + cart[id].price);
    console.log('Total Price :', totalPrice); // Console log pour totalPrice
}

const handleDecrement = (id) => {
    console.log('Handle Decrement :', id); // Console log pour id
    if (cart[id].quantity === 1) {
        removeFromCart(id);
        setTotalPrice(totalPrice - cart[id].price);
        console.log('Total Price :', totalPrice); // Console log pour totalPrice
    }
    else {
        addToCart(id, -1);
        setTotalPrice(totalPrice - cart[id].price);
        console.log('Total Price :', totalPrice); // Console log pour totalPrice
    }
}

const handleCheckout = () => {
    console.log("Commande acceptée !");
}


return (
    <div>
        <h1>Panier</h1>
        <ul>
            {Object.keys(cart).map((id) => {
                const product = cart[id];
                return (
                    <li key={id}>
                        <img src={`${BASE_IMG}/${product.url}`} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price}€</p>
                        <div>
                            <button onClick={() => handleIncrement(id)}>+</button>
                            <span>{product.quantity}</span>
                            <button onClick={() => handleDecrement(id)}>-</button>
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