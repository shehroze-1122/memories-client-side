import { AUTH, LOGOUT, LOGIN_ERROR } from '../constants/actionTypes'

const initialState = {
  authData: null,
  error: false
}
export const authReducer = (
  state = initialState,
  action: { type: string; payload: { user: { name: string; id: string }; token: string } }
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        'profile',
        JSON.stringify({ name: action?.payload.user.name, id: action?.payload.user.id, token: action?.payload.token })
      )
      return Object.assign({}, state, { ...state, error: false, authData: action.payload })
    case LOGOUT:
      localStorage.clear()
      return Object.assign({}, state, { ...state, authData: null })
    case LOGIN_ERROR:
      return Object.assign({}, state, { ...state, error: true })
    default:
      return state
  }
}
