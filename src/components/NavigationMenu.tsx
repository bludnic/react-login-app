import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Translation } from 'react-i18next'
import { connect } from 'react-redux'

import LanguageSwitcher from './LanguageSwitcher'
import { State } from '../store/reducers'

interface Props {
  isLoggedIn: boolean
}

class NavigationMenu extends React.Component<Props> {
  genMenuItems () {
    if (!this.props.isLoggedIn) {
      return [
        <Menu.Item key="/login">
          <Translation>{t => t('Log In')}</Translation>
          <Link to="/login" />
        </Menu.Item>,

        <Menu.Item key="/signup">
          <Translation>{t => t('Sign Up')}</Translation>
          <Link to="/signup" />
        </Menu.Item>
      ]
    }
  }

  render () {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        defaultSelectedKeys={['/']}
      >
        <Menu.Item key="/">
          <Translation>{t => t('Home')}</Translation>
          <Link to="/" />
        </Menu.Item>

        {this.genMenuItems()}

        <div style={{ float: 'right' }}>
          <LanguageSwitcher />
        </div>
      </Menu>
    )
  }
}

const mapStateToProps = (state: State) => ({
  isLoggedIn: !!state.token
})

export default connect(mapStateToProps)(NavigationMenu)
