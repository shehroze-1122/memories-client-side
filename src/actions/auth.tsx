import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router'
import decode from 'jwt-decode'
import { AUTH, LOGIN_END, LOGIN_ERROR, LOGIN_START } from '../constants/actionTypes'
import { formDataType } from '../components/Auth/Auth'

type decodedTokenType = {
  exp: number
  id: string
  email: string
  name: string
}

const url = `${process.env.REACT_APP_API_URL}/users/`

export const signin = (formData: formDataType, navigate: NavigateFunction) => async (dispatch: Dispatch<object>) => {
  dispatch({
    type: LOGIN_START
  })
  fetch(url + 'signin', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
        dispatch({ type: LOGIN_ERROR, payload: data.message })
      } else {
        const payload = { name: data?.user.firstName + ' ' + data?.user.lastName, id: data?.user._id }
        localStorage.setItem('token', data?.token)
        dispatch({ type: AUTH, payload })
        navigate('/')
      }
    })
    .finally(() => {
      dispatch({ type: LOGIN_END })
    })
}

export const signup = (formData: formDataType, navigate: NavigateFunction) => async (dispatch: Dispatch<object>) => {
  dispatch({
    type: LOGIN_START
  })
  fetch(url + 'signup', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.message) {
        dispatch({ type: LOGIN_ERROR, payload: data.message })
      } else {
        const payload = { name: data?.user.firstName + ' ' + data?.user.lastName, id: data?.user._id }
        localStorage.setItem('token', data?.token)
        dispatch({ type: AUTH, payload })
        navigate('/')
      }
    })
    .finally(() => {
      dispatch({ type: LOGIN_END })
    })
}

export const verifyToken = (token: string) => async (dispatch: Dispatch<object>) => {
  try {
    const decodedToken = decode<decodedTokenType>(token)
    if (decodedToken.exp * 1000 >= new Date().getTime()) {
      const { id, name, email } = decodedToken
      const payload = { id, name, email }
      dispatch({ type: AUTH, payload })
    }
  } catch (error) {}
}
