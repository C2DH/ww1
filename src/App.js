import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'

import Home from './pages/Home'
import Collection from './pages/Collection'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/collection' component={Collection} />
      </Switch>
    </Router>
  </Provider>
)

export default App
