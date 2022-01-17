import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = {
    authData: null 
}
export const authReducer = (state = initialState, action: { type: string, payload: { user: { name: string, id: string }, token: string}}) =>{

    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ name: action?.payload.user.name , id: action?.payload.user.id, token:action?.payload.token }));
            return Object.assign({}, state, {...state,  authData: action.payload});
        case LOGOUT:
            localStorage.clear();
            return Object.assign({}, state, {...state, authData: null })
        default:
            return state;
    }
} 