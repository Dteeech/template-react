const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            console.log(action)
            return{
                ...state,
                user: action.payload,
                isLogged : true
            }
        case 'LOGOUT':
            return {
                ...state,
                user: {},
                isLogged: false
            }
            
        
        default:
        return state;
    }
}

export default reducer