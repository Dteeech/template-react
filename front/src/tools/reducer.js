const reducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            console.log(action)
            return{
                ...state,
                user: {
                    isLogged:true,
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
            
        
        default:
        return state;
    }
}

export default reducer