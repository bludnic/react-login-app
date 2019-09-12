import React from 'react'
import { Button, Card } from 'antd'
import { connect } from 'react-redux'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { Translation } from 'react-i18next'

import LoginForm from '../components/LoginForm'
import store from '../store'
import { LOGIN_REQUEST } from '../store/actions'
import { State } from '../store/reducers'

interface Props extends RouteComponentProps {
  isLoggedIn: boolean
}

class SignIn extends React.Component<Props> {
  onLogin (email: string, password: string) {
    store.dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email,
        password
      }
    })
  }

  onError (err: Error) {
    console.log('Show SnackBar', err.message)
  }

  render () {
    if (this.props.isLoggedIn) return <Redirect to="/" />

    return (
      <div>
        <Card
          className="sign-card"
          title={<Translation>{t => t('Log In')}</Translation>}
        >
          <LoginForm
            onLogin={this.onLogin}
            onError={this.onError}
          />

          <div className="sign-card__bottom-area">
            <div className="sign-card__bottom-title">
              <Translation>{t => t('Are you here for the first time?')}</Translation>
            </div>
            <Button block>
              <Translation>{t => t('Sign Up')}</Translation>
              <Link to="/signup" />
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  isLoggedIn: !!state.token
})

export default connect(mapStateToProps)(SignIn)
