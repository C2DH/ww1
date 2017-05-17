import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'

import Home from './pages/Home'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  </Provider>
)

export default App
