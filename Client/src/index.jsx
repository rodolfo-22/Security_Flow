import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './utils/UserContext';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='927856352370-jlatbrbc93vf8so236e2c8u5kqaipttd.apps.googleusercontent.com'>
      <React.StrictMode>
        <BrowserRouter>
          <UserProvider>
            <App/>
          </UserProvider>
        </BrowserRouter>
      </React.StrictMode>
  </GoogleOAuthProvider>
)

