import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import {
  Home,
  BadgesHome,

} from "./";

import {
  Notification,

} from "../components";

import {
  networkId, 
  
} from "../nft"

export default function AppRouter() {
  const [_, showNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("")
  const componentDidMount = () => {
  if(window.walletConnection.isSignedIn()) {
    showNotification(true);
      setNotificationMessage("You are logged ");
      
      setTimeout(() => {
        console.log('asdas');
        showNotification(false);
      }, 500)
    }
    
  }
  
  useEffect(componentDidMount, []);
  
  if (!window.walletConnection.isSignedIn()) {
    return <Home />
  }
  
  return (
    <Router>
      <Switch>
        <Route path={"/"}>
        <BadgesHome />
        </Route>
      </Switch>
        { 
          showNotification && ( <Notification message={notificationMessage} networkId={networkId} /> ) 
        }
    </Router>
  )
}
