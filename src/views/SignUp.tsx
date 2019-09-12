import React from 'react'
import { Button, Card } from 'antd'
import { connect } from 'react-redux'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'
import { Translation } from 'react-i18next'

import SignUpForm from '../components/SignUpForm'
import store from '../store'
import { SIGN_UP_REQUEST } from '../store/actions'
import { State } from '../store/reducers'

interface Props extends RouteComponentProps {
  isLoggedIn: boolean
}

class SignUp extends React.Component<Props> {
  onSignUp (
    email: string,
    password: string,
    name: string
  ) {
    store.dispatch({
      type: SIGN_UP_REQUEST,
      payload: {
        email,
        password,
        name
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
          title={<Translation>{t => t('Sign Up')}</Translation>}
        >
          <SignUpForm
            onSignUp={this.onSignUp}
            onError={this.onError}
          />

          <div className="sign-card__bottom-area">
            <div className="sign-card__bottom-title">
              <Translation>{t => t('Already registered?')}</Translation>
            </div>
            <Button block>
              <Translation>{t => t('Log In')}</Translation>
              <Link to="/login" />
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

export default connect(mapStateToProps)(SignUp)
