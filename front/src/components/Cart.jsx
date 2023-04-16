import { StoreContext } from "../tools/context.js"
import { NavLink } from "react-router-dom"
import Nav from "./Nav.jsx"
import { BASE_IMG } from "../tools/constante.js"
import useCart from "./Hooks/useCart.jsx"
import { useContext, useState, useEffect, Fragment } from "react"

const Cart = () => {
    const { removeFromCart, getCart, clearCart } = useCart();
    const { isEmpty, setIsEmpty } = useState(true)
    const [totalPrice, setTotalPrice] = useState(0);
    const [state, dispatch] = useContext(StoreContext)
    const [loading, setLoading] = useState(true)
    const [orderAccepted, setOrderAccepted] = useState(false)
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
        //vider le panier
        clearCart(userId)
        console.log("Commande acceptée !");
        setOrderAccepted(true)
        console.log(state.cart)
    }

    if (loading) {
        return <div>Loading</div>
    }
    if (state.cart === [] ){
        return (
            <div>
                <Nav />
                <h2>Votre panier est vide</h2>
            </div>
        )}
    else {
    return (
        <Fragment>
            <Nav />
            <div className="cart">
                <h1>Panier</h1>
                    <ul>
                        {state.cart.map((product,i) => {
                        console.log(product)
                            return (
                                <div  className="productCard" key={`${product.id}`}>
                                    <img className="productImage" src={`${BASE_IMG}/${product.url}`} alt={product.name} />
                                    <li>{product.name}</li>
                                    <li>{product.price}€</li>
                                    <button onClick={() => handleDelete(product.product_id)}>Supprimer l'article</button>
                                </div>
                            )
                        })}
                    </ul>
                <div>
                    <p>Total : {totalPrice}€</p>
                    <button className="productCaption" onClick={() => handleCheckout()}>Commander</button>
                    {orderAccepted && <p>Votre commande à bien été prise en compte par nos services</p>}
                </div>
            </div>
        </Fragment>
    )}
}

export default Cart;