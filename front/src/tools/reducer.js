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
                user: {
                    isLogged: false
                },
                
            }
        case "ALL_PRODUCTS":
            return {
                ...state,
                products: action.payload,

            }

        case "ADD_TO_CART":
                    return {
                        ...state,
                        cart: state.cart.map(item => {
                            
                            return item;
                        })
                    };
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
            console.log("dans le reducer")
            return {
                
                ...state,
                cart: []
                
            };


        default:
            return state;
    }
}

export default reducer