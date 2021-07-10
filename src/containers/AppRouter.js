import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import {
  Home,
  BadgesHome,
  CreateNewBadges,
  BadgesList,

} from "./";

import {
  Notification,

} from "../components";

import {
  networkId, 
  
} from "../nft"

export default function AppRouter() {
  const [notification, showNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
  const componentDidMount = () => {
    if(window.walletConnection.isSignedIn()) {
      showNotification(true);
      setNotificationMessage("You are logged ");
      
      setTimeout(() => {
        showNotification(false);
      }, 1000)
    }
  }
  
  useEffect(componentDidMount, []);
  
  if (!window.walletConnection.isSignedIn()) {
    return <Home />
  }
  
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact>
          <BadgesHome />
        </Route>
        <Route path={"/new"}>
          <CreateNewBadges />
        </Route>
        <Route path={"/badges/:account"}>
          <BadgesList />
        </Route>
      </Switch>
        { 
          notification && ( <Notification message={notificationMessage} networkId={networkId} /> ) 
        }
    </Router>
  )
}
