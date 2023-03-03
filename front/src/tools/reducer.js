const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action)
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

        case "ADD_TO_CART":
            // Vérification de la disponibilité du produit avant de l'ajouter au panier
            // Si le produit est disponible, on l'ajoute au panier et on décrémente la quantité en stock
            // Sinon, on renvoie simplement l'état courant du panier
            const productToAdd = state.products.find(product => product.id === action.payload.productId);
            if (productToAdd.quantityInStock >= action.payload.quantity) {
                const existingItem = state.cart.find(item => item.productId === action.payload.productId);
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
                        cart: [...state.cart, { productId: action.payload.productId, quantity: action.payload.quantity }]
                    };
                }
            }
            else {
                return state;
            }

        case "REMOVE_FROM_CART":
            // Suppression d'un article du panier
            return {
                ...state,
                cart: state.cart.filter(item => item.productId !== action.payload.productId)
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