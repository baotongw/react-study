import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from '../../../lib/react-redux/index'
import store from './reducer/index'
import App from './App'
debugger
function Root(props) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('container'))
