import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LoginData,
  SignUpData
} from './actions'
import * as api from '../api'

interface LoginAction {
  type: typeof LOGIN_REQUEST
  payload: LoginData
}

interface SignUpAction {
  type: typeof SIGN_UP_REQUEST
  payload: SignUpData
}

export function* logIn (action: LoginAction) {
  try {
    const user = yield call(
      api.logIn,
      action.payload.email,
      action.payload.password
    )

    yield put({ type: LOGIN_SUCCESS, payload: user })
  } catch (err) {
    yield put({ type: LOGIN_ERROR, message: err.message })
  }
}

export function* signUp (action: SignUpAction) {
  try {
    const user = yield call(
      api.signUp,
      action.payload.email,
      action.payload.password,
      action.payload.name
    )
    yield put({ type: SIGN_UP_SUCCESS, payload: user })
  } catch (err) {
    yield put({ type: SIGN_UP_ERROR, message: err.message })
  }
}

export default function* mySaga () {
  yield all([
    takeLatest(LOGIN_REQUEST, logIn),
    takeLatest(SIGN_UP_REQUEST, signUp)
  ])
}
