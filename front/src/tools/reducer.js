const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: {
                    isLogged: true,
                    isAdmin: action.payload.admin,
                    ...action.payload
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                user: {},
                isLogged: false
            }
        case "ALL_PRODUCTS":
            return {
                ...state,
                products: action.payload,

            }

        case "ADD_TO_CART":
            // Vérification de la disponibilité du produit avant de l'ajouter au panier
            // Si le produit est disponible, on l'ajoute au panier et on décrémente la quantité en stock
            // Sinon, on renvoie simplement l'état courant du panier
            const productToAdd = state.products.find(product => product.id === action.payload.id);
            if (productToAdd.stock >= action.payload.quantity) {
                const existingItem = state.cart.find(item => item.productId === action.payload.id);
                if (existingItem) {
                    return {
                        ...state,
                        cart: state.cart.map(item => {
                            if (item.productId === action.payload.productId) {
                                return { ...item, quantity: item.quantity + action.payload.quantity };
                            }
                            return item;
                        })
                    };
                }
                else {
                    return {
                        ...state,
                        cart: [...state.cart, action.payload]
                    };
                }
            }
            else {
                return state;
            }

        case "GET_CART":
            return {
                ...state,
                cart: action.payload
            }

        case "REMOVE_FROM_CART":
            // Suppression d'un article du panier
            // old => cart: state.cart.filter(item => item.productId !== action.payload.productId)
            return {
                ...state,
                cart: state.cart.filter(item => item.product_id !== action.payload)
            };

        case "EMPTY_CART":
            // Suppression de tous les articles du panier
            return {
                ...state,
                cart: []
            };


        default:
            return state;
    }
}

export default reducer