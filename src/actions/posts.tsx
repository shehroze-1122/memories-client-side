import { Dispatch } from 'react';

export type postsType = {
    id?: number,
    title: string,
    message: string,
    creator: string,
    tags: string[],
    selectedFile: string,
    likes?: number,
    createdAt?: Date
    
}

const url = 'http://localhost:5000/posts/';


export const fetchPostsAction = ()  => async (dispatch: Dispatch<Object>) =>{ 
    const resp = await fetch(url);
    const data = await resp.json();
    dispatch({
        type: 'FETCH_POSTS',
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
        dispatch({type:'CREATE_POST', payload: post})
    })
}

export const incLikes = (post: postsType) => (dispatch: Dispatch<Object>) =>{

    fetch( url+'likesInc', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    })
    .then((resp=>resp.json()))
    .then((posts)=>{
        dispatch({type:'INCREMENT_LIKES', payload: posts})
    })
}

export const decLikes = (post: postsType) => (dispatch: Dispatch<Object>) =>{

    fetch( url+'/likesDec', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    })
    .then((resp=>resp.json()))
    .then((posts)=>{
        dispatch({type:'DECREMENT_LIKES', payload: posts})
    })
}