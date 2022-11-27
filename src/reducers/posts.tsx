import { FETCH_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST } from '../constants/actionTypes'
import { ObjectId } from 'mongoose'
import { postsType } from '../actions/posts'

export type postsStateType = {
  posts: postsType[]
  postsLoading: boolean
  fetchError: boolean
}
export const initialState: postsStateType = {
  posts: [],
  postsLoading: true,
  fetchError: false
}

type fetchPostsType = {
  data: postsType[]
  loading: boolean
  error: boolean
}

type payloadType = fetchPostsType | postsType | ObjectId

export const assignPosts = (state = initialState, action: { type: string; payload: payloadType }) => {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, { ...action.payload })
    case CREATE_POST:
      return Object.assign({}, state, { posts: [...state.posts, action.payload] })
    case UPDATE_POST:
      return Object.assign({}, state, {
        posts: state.posts.map(post => (post._id === (action.payload as postsType)._id ? action.payload : post))
      })
    case DELETE_POST:
      return Object.assign({}, state, { posts: state.posts.filter(post => post._id !== (action.payload as ObjectId)) })
    default:
      return state
  }
}
