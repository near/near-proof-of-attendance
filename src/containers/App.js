import React from 'react'

import { 
  AppRouter,
  
} from "./";

import {
  AppHeader,

} from "../components";

export default function App() {
  
  return (
    <>
      { window.walletConnection.isSignedIn() ? (<AppHeader />) : null }
      <AppRouter />
      
    </>
  )
}
