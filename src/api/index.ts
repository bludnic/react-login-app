import { Account } from '../store/actions'

const account: Account = {
  name: 'bludnic',
  email: 'za@bludnic.com',
  token: 'KVOFkthaJyzt2nH9',
  expire: 1568205592770
}

export function logIn (email: string, password: string): Promise<Account> {
  return new Promise(
    resolve => setTimeout(() => resolve({ ...account, email }), 3000)
  )
}

export function signUp (
  email: string,
  password: string,
  name: string
): Promise<Account> {
  return new Promise(
    resolve => setTimeout(() => resolve({ ...account, email, name }), 3000)
  )
}
