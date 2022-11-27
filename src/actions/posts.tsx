import { Dispatch } from 'react'
import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../constants/actionTypes'
import { ObjectId } from 'mongoose'

export type postsType = {
  _id?: ObjectId
  title: string
  message: string
  creator?: string
  name?: string
  tags: string[]
  selectedFile: string
  likes?: string[]
  createdAt?: Date
}

let token: string | null = localStorage.getItem('token')

const url = `${process.env.REACT_APP_API_URL}/posts/`

export const fetchPostsAction = () => async (dispatch: Dispatch<Object>) => {
  dispatch({
    type: FETCH_POSTS,
    payload: {
      postsLoading: true
    }
  })
  try {
    const resp = await fetch(url)
    const posts = await resp.json()
    dispatch({
      type: FETCH_POSTS,
      payload: { posts, fetchError: false }
    })
  } catch (error) {
    dispatch({
      type: FETCH_POSTS,
      payload: { fetchError: true }
    })
  } finally {
    dispatch({
      type: FETCH_POSTS,
      payload: { postsLoading: false }
    })
  }
}

export const createPost = (postData: postsType) => (dispatch: Dispatch<Object>) => {
  fetch(url, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
    body: JSON.stringify(postData)
  })
    .then(resp => resp.json())
    .then(post => {
      dispatch({ type: CREATE_POST, payload: post })
    })
}

export const updatePost = (postData: postsType, id: ObjectId) => (dispatch: Dispatch<Object>) => {
  fetch(url + id, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
    body: JSON.stringify(postData)
  })
    .then(resp => resp.json())
    .then(post => {
      dispatch({ type: UPDATE_POST, payload: post })
    })
}

export const deletePost = (id: ObjectId) => (dispatch: Dispatch<Object>) => {
  fetch(url + id, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  })
    .then(resp => resp.json())
    .then(data => {
      dispatch({ type: DELETE_POST, payload: id })
    })
}

export const likePost = (id: ObjectId) => (dispatch: Dispatch<Object>) => {
  fetch(url + `${id}/likePost`, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  })
    .then(resp => resp.json())
    .then(updatedPost => {
      dispatch({ type: UPDATE_POST, payload: updatedPost })
    })
}
