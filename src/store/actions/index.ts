export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'

export interface LoginData {
  email: string
  password: string
}

export interface SignUpData {
  email: string
  password: string
  name: string
}

export interface Account {
  name: string
  email: string
  token: string
  expire: number
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST
  payload: LoginData
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  payload: Account
}

export interface LoginErrorAction {
  type: typeof LOGIN_ERROR
  message: string
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST
  payload: SignUpData
}

export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
  payload: Account
}

export interface SignUpErrorAction {
  type: typeof SIGN_UP_ERROR,
  message: string
}

export interface SignOutRequestAction {
  type: typeof SIGN_OUT_REQUEST
}

export type UserAction =
  LoginRequestAction |
  LoginSuccessAction |
  LoginErrorAction |
  SignUpRequestAction |
  SignUpSuccessAction |
  SignUpErrorAction |
  SignOutRequestAction
