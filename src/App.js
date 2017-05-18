import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'

import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/collection' component={Collection} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
)

export default App
