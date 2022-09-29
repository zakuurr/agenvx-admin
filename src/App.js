import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import { Switch, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

// Import Routes all
import { userRoutes, authRoutes } from './routes/allRoutes'

// Import all middleware
import Authmiddleware from './routes/middleware/Authmiddleware'

// layouts Format
import VerticalLayout from './components/VerticalLayout/'
// import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from './components/NonAuthLayout'

// Import scss
import './assets/scss/theme.scss'

import fakeBackend from './helpers/AuthType/fakeBackend'

// Activating fake backend
fakeBackend()

const App = props => {
  const getLayout = () => {
    let layoutCls = VerticalLayout
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
