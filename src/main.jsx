import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='1004817003092-nofkjmsdc4ohuc401l5vcdhb69l51tdv.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
)
