import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'

import Layout from './components/Layout'
import Home from './pages/Home'
import Themes from './pages/Themes'
import MapPage from './pages/MapPage'
import Timeline from './pages/Timeline'
import Education from './pages/Education'
import Collection from './pages/Collection'
import CollectionDetail from './pages/CollectionDetail'
import CollectionDetailModal from './pages/CollectionDetailModal'
import Resources from './pages/Resources'

class Routes extends React.Component {
  //https://reacttraining.com/react-router/web/example/modal-gallery
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }


  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    console.log(isModal, location.state)
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path='/' exact component={Home} />
          <Route path='/themes' exact component={Themes} />
          <Route path='/map' exact component={MapPage} />
          <Route path='/timeline' exact component={Timeline} />
          <Route path='/education' exact component={Education} />
          <Route path='/collection' exact component={Collection} />
          <Route path='/collection/item/:id' exact component={CollectionDetail} />
          <Route path='/resources' exact component={Resources} />
        </Switch>
        {isModal ? <Route path='/collection/item/:id' component={CollectionDetailModal} /> : null}
      </div>
    )
  }


}



const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route component={Routes}/>
      </Layout>
    </Router>
  </Provider>
)

export default App
