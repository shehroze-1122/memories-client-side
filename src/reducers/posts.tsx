import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../constants/actionTypes';
import { ObjectId } from "mongoose";
import { postsType } from "../actions/posts";

export type postsStateType = {
    posts: postsType[]
}
export const initialState:postsStateType = {
    posts: []
}

export const assignPosts = (state=initialState, action: {type: string, payload: postsType | ObjectId}) =>{
    switch(action.type){
        case FETCH_POSTS:
            return Object.assign({}, state, { posts: action.payload});
        case CREATE_POST:
            return Object.assign({}, state, { posts: [...state.posts, action.payload]})
        case UPDATE_POST:
            return Object.assign({}, state, { posts: state.posts.map((post)=>post._id===(action.payload as postsType)._id? action.payload:post )})
        case DELETE_POST:
            return Object.assign({}, state, { posts: state.posts.filter((post)=>post._id !== (action.payload as ObjectId)) })
        default:
            return state;
    }
}