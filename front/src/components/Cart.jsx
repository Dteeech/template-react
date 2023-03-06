import { StoreContext } from "../tools/context.js"
import { NavLink } from "react-router-dom"
import { BASE_IMG } from "../tools/constante.js"
import useCart from "./Hooks/useCart.jsx"
import { useContext, useState, useEffect, Fragment } from "react"

const Cart = () => {
    const { removeFromCart, getCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const [state , dispatch] = useContext(StoreContext)
    const [loading, setLoading] = useState(true)
    const userId = state.user.id

    console.log(state)

    useEffect(() => {
        let price = 0;
        state.cart.forEach((product) => {
            price += product.price;
        });
        setTotalPrice(price);
    }, [state.cart]);
    
    useEffect(() => {
        console.log(userId)
        console.log(state.cart)
        const fetch = async() => {
            if (userId) {
                await getCart(userId)
            }
        }
        fetch()
        setLoading(false)
    }, [userId])

    const handleDelete = (productId) => {
        
        console.log(userId, productId)
        removeFromCart(userId, productId)
    }


    const handleCheckout = () => {

        console.log("Commande acceptée !");
    }

    if (loading) {
        return <div>Loading</div>
    }
    return (
        <div>
        <h1>Panier</h1>
        <NavLink to="/">Accueil</NavLink>
        <ul>
            {state.cart.map((product,i) => {
            console.log(product)
                return (
                    <Fragment key={`${product.id}`}>
                        <img src={`${BASE_IMG}/${product.url}`} alt={product.name} />
                        <li>{product.name}</li>
                        <li>{product.price}€</li>
                        <button onClick={() => handleDelete(product.product_id)}>Supprimer l'article</button>
                    </Fragment>
                )
            })}
        </ul>
        <p>Total : {totalPrice}€</p>
        <button onClick={() => handleCheckout()}>Commander</button>
    </div>
    )
}

export default Cart;