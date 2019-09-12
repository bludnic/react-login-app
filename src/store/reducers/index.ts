import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UserAction,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_REQUEST
} from '../actions'

export interface State {
  name: string
  email: string
  token: string
  expire: number
  isFetching: boolean
}

const initialState: State = {
  name: '',
  email: '',
  token: '',
  expire: 0,
  isFetching: false
}

function userReducer (
  state = { ...initialState },
  action: UserAction
): State {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload
      }
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload
      }
    case SIGN_OUT_REQUEST:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default userReducer
