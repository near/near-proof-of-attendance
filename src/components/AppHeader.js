import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import Notification from "./Notification";

import { login, logout } from '../utils'

import { test_nft_mint } from "../nft";

import getConfig from '../config'


const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const styles = {}

export default function AppHeader() {
  
  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <header style={styles}>
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>Network ID: { networkId } </p>
        <button className="link" onClick={logout}>
          Sign out
        </button>
      </header>
    </>
  )
}


