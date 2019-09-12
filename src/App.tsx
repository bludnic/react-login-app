import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'

import './App.css'

import Home from './views/Home'
import NavigationMenu from './components/NavigationMenu'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'

const { Header, Content } = Layout

const App: React.FC = ({ children }) => {
  return (
    <Router>
      <div className="app">
        <Layout className="layout">
          <Header>
            <NavigationMenu />
          </Header>
          <Content className="content">
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Content>
        </Layout>
      </div>
    </Router>
  )
}

export default App
