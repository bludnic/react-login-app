import React, {ReactPropTypes} from 'react'
import { Card, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Translation } from 'react-i18next'

import store from '../store'
import { SIGN_OUT_REQUEST } from '../store/actions'
import { State } from '../store/reducers'

interface Props extends ReactPropTypes {
  isLoggedIn: boolean
  email: string
  name: string
}

class Home extends React.Component<Props> {
  signOut () {
    store.dispatch({
      type: SIGN_OUT_REQUEST
    })
  }

  render () {
    if (!this.props.isLoggedIn) return <Redirect to="/login" />

    return (
      <Card className="home-card">
        <h3 className="home-card__title">
          <Translation>{t => t('Howdy')}</Translation>, {this.props.name}
        </h3>
        <div className="home-card__email">{this.props.email}</div>

        <Button className="home-card__button" onClick={this.signOut}>
          <Translation>{t => t('Sign Out')}</Translation>
        </Button>
      </Card>
    )
  }
}

const mapStateProps = (state: State) => ({
  isLoggedIn: !!state.token,
  email: state.email,
  name: state.name
})

export default connect(mapStateProps)(Home)
