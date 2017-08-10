import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import I18n from "redux-i18n"
import store from './state'
import { Tooltip } from 'redux-tooltip';

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
import Manual from './pages/Manual'
import StaticStory from './pages/StaticStory'
import ThemeExplorer from './pages/ThemeExplorer'
import About from './pages/About'
import translations from './translations/translations.json'
import { setLanguage } from './state/actions'
import TermsOfUse from './pages/TermsOfUse'

class Routes extends PureComponent {
  //https://reacttraining.com/react-router/web/example/modal-gallery
  previousLocation = this.props.location

  componentDidMount(){
    store.dispatch(setLanguage('en_US'))
  }

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
          <Route path='/manual' exact component={Manual} />
          <Route path='/themes/:themeSlug' component={ThemeExplorer} />
          <Route path='/about' exact component={About} />
          <Route path='/terms-of-use' exact component={TermsOfUse} />
        </Switch>
        {isModal ? <Route path='/collection/item/:id' component={CollectionDetailModal} /> : null}
      </div>
    )
  }
}

const App = () => (
  <Provider store={store}>
    <I18n translations={translations} fallbackLang="en_US">
      <Router>
        <Layout>
          <Tooltip/>
          <Route component={Routes}/>
        </Layout>
      </Router>
    </I18n>
  </Provider>
)



export default App
