import { Dispatch } from 'react';
import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../constants/actionTypes'
import { ObjectId } from 'mongoose';

export type postsType = {

    _id?: ObjectId,
    title: string,
    message: string,
    creator: string,
    tags: string[],
    selectedFile: string,
    likes?: number,
    createdAt?: Date
    
}

const url = 'https://memories-serverside.herokuapp.com/posts/';


export const fetchPostsAction = ()  => async (dispatch: Dispatch<Object>) =>{ 

    const resp = await fetch(url);
    const data = await resp.json();
    dispatch({
        type: FETCH_POSTS,
        payload: data
    })
} 

export const createPost = ( postData: postsType ) => (dispatch: Dispatch<Object>) =>{

    fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(postData)

    })
    .then((resp) =>resp.json())
    .then((post) => {
        dispatch({type: CREATE_POST, payload: post})
    })
}

export const updatePost = ( postData: postsType, id: ObjectId ) => (dispatch: Dispatch<Object>) =>{

    fetch(url+id, {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(postData)
    })
    .then((resp) =>resp.json())
    .then((post) => {
        dispatch({type: UPDATE_POST, payload: post})
    })
}

export const deletePost = (id: ObjectId) => (dispatch: Dispatch<Object>) =>{

    fetch(url+id, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp=>resp.json())
    .then(data=>{
        dispatch({type: DELETE_POST, payload:id})
    })
}

export const incLikes = (id: ObjectId) => (dispatch: Dispatch<Object>) =>{

    fetch( url+`${id}/likesInc`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
    })
    .then((resp=>resp.json()))
    .then((updatedPost)=>{
        dispatch({type: UPDATE_POST, payload: updatedPost})
    })
}

export const decLikes = (id: ObjectId) => (dispatch: Dispatch<Object>) =>{

    fetch( url+`${id}/likesDec`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
    })
    .then((resp=>resp.json()))
    .then((updatedPost)=>{
        dispatch({type: UPDATE_POST, payload: updatedPost})
    })
}