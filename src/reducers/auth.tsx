import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = {
    authData: null 
}
export const authReducer = (state = initialState, action: { type: string, payload: Object}) =>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload}));
            return { ...state, authData: action.payload};
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null}

        default:
            return state;
    }
} 