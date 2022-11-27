import { AUTH, LOGOUT, LOGIN_ERROR, LOGIN_START, LOGIN_END } from '../constants/actionTypes'

const initialState = {
  user: null,
  error: '',
  loading: false
}
export const authReducer = (
  state = initialState,
  action: { type: string; payload: { user: { name: string; id: string }; token: string } | string }
) => {
  switch (action.type) {
    case AUTH:
      return Object.assign({}, state, { ...state, error: '', user: action.payload })
    case LOGOUT:
      localStorage.clear()
      return Object.assign({}, state, { ...state, user: null })
    case LOGIN_ERROR:
      return Object.assign({}, state, { ...state, error: action.payload })
    case LOGIN_START:
      return Object.assign({}, state, { ...state, loading: true })
    case LOGIN_END:
      return Object.assign({}, state, { ...state, loading: false })
    default:
      return state
  }
}
