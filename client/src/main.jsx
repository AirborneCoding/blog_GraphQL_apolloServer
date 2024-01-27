import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// styles
import './styles/index.css'
import './styles/projectStyles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import { Toaster } from 'react-hot-toast';

// react-redux
import { Provider } from "react-redux"
import { store } from "./redux/store.js"

// apollo config
import { ApolloProvider } from '@apollo/client';
import client from "./config/apollo.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Toaster />
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
