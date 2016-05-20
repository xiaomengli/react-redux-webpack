import './style/main.scss'

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducer from './reducers'
import { fetchUser } from './actions/auth' 
import fallbackActionType from './middlewares/fallbackActionType'
import App from './containers/App'

injectTapEventPlugin()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  fallbackActionType
)(createStore)

const store = createStoreWithMiddleware(
  reducer,
  __DEBUG__ && window.devToolsExtension ? window.devToolsExtension() : undefined
)

const history = syncHistoryWithStore(browserHistory, store)

function requireAuth(nextState, replace, callback) {
  store.dispatch(fetchUser())
    .then(() => {
      callback()
    })
    .catch(() => {
      callback()
      //redirect to login page
    })
}

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App} onEnter={requireAuth}>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app_wrapper')
)