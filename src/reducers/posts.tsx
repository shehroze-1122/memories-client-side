import { postsType } from "../actions/posts";

export type postsStateType = {
    posts: postsType[]
}
export const initialState:postsStateType = {
    posts: []
}

export const assignPosts = (state=initialState, action: {type: string, payload: postsType[]}) =>{
    switch(action.type){
        case 'FETCH_POSTS':
            return Object.assign({}, state, { posts: action.payload});
        case 'CREATE_POST':
            return Object.assign({}, state, { posts: [...state.posts, action.payload]})
        // case 'INCREMENT_LIKES':
        //     return Object.assign({}, state, { posts: action.payload})
        // case 'DECREMENT_LIKES':
        //     return Object.assign({}, state, { posts: action.payload})
        default:
            return state;
    }
}