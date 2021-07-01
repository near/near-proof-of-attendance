import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
// import { initContract } from './utils';
import { initContract } from "./nft"
import './global.css'
window.nearInitPromise = initContract()
  .then(() => {
    console.log("this happens")
    ReactDOM.render(
      <App />,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
