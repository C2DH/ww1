import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './saga'

const preloadedState = {
  // Hardcoed \w endless love
  languages: [
    {
      label: 'EN',
      code: 'en_US',
      description: 'English',
    },
    {
      label: 'FR',
      code: 'fr_FR',
      description: 'French',
    },
    {
      label: 'DE',
      code: 'de_DE',
      description: 'German',
    },
  ]
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
sagaMiddleware.run(rootSaga)

export default store
