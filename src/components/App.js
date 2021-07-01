import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'

import Home from "./Home";
import Notification from "./Notification";

import { login, logout } from '../utils'

import { test_nft_mint } from "../nft";

import getConfig from '../config'


const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = useState()

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = useState(false)
  
  const componentDidMount = () => {

  }

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  // The second argument to useEffect tells React when to re-run the effect
  // Use an empty array to specify "only run on first render"
  // This works because signing into NEAR Wallet reloads the page  
  // if not signed in, return early with sign-in prompt

  useEffect(componentDidMount, [])
  
  const onSubmit = async (event) => {
    event.preventDefault();
    // get elements from the form using their id attribute
    const { fieldset, greeting } = event.target.elements

    // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
    const newGreeting = greeting.value

    // disable the form while the value gets updated on-chain
    fieldset.disabled = true

    try {
      // make an update call to the smart contract
      await window.contract.setGreeting({
        // pass the value that the user entered in the greeting field
        message: newGreeting
      })
    } catch (e) {
      alert(
        'Something went wrong! ' +
        'Maybe you need to sign out and back in? ' +
        'Check your browser console for more info.'
      )
      throw e
    } finally {
      // re-enable the form, whether the call succeeded or failed
      fieldset.disabled = false
    }

    // update local `greeting` variable to match persisted value
    setGreeting(newGreeting)

    // show Notification
    setShowNotification(true)

    // remove Notification again after css animation completes
    // this allows it to be shown again next time the form is submitted
    setTimeout(() => {
      setShowNotification(false)
    }, 11000)
  }
  const onChange = (event) => {
    setButtonDisabled(event.target.value === greeting)
  }
  
  const nft_token = {
    "owner_id": "johnq.testnet", 
    "token_id": `ajd6rl`, 
    "metadata": { 
      "title": "SomeNFTTitle", 
      "description": "SomeNFTDesci", 
      "media": "https://i.imgur.com/ardmpqm.png",  
      "media_hash": "what is media_hash?", 
      "copies": "3", 
      "issued_at": "05/28/2021", 
      "expires_at": "05/28/2031", 
      "starts_at": "05/28/2021", 
      "updated_at": "what is updated_at?", 
      "extra": "SomeNFTExtra", 
      "reference": "SomeNFTReference", 
      "reference_hash": "SomeNFTReferenceHash" 
    }
  }
  
  const onInit = async (event) => {
    event.preventDefault();
    try {
      await window.contract.init({
        owner_id: "johnq",
        metadata: nft_token.metadata
      })
    } catch (e) {
      alert(
        'Something went wrong! ' +
        'Maybe you need to sign out and back in? ' +
        'Check your browser console for more info.'
      )
      throw e
    }
  }
  
  if (!window.walletConnection.isSignedIn()) {
    return <Home />
  }
  
  const nft_mint = async (event) => {
    event.preventDefault();
    try {
      // make an update call to the smart contract
      await test_nft_mint()
      console.log('i work in UI')
    } catch (e) {
      console.log('e',e)
      alert(
        'Something went wrong! with nft_mint'
      )
      throw e
    } finally {
      // re-enable the form, whether the call succeeded or failed
      // fieldset.disabled = false
      console.log("finally")
    }
  }
  
  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
            {greeting}
          </label>
          {' '/* React trims whitespace around tags; insert literal space character when needed */}
          {window.accountId}!
        </h1>
        <form onSubmit={onSubmit}>
          <fieldset id="fieldset">
            <label
              htmlFor="greeting"
              style={{
                display: 'block',
                color: 'var(--gray)',
                marginBottom: '0.5em'
              }}
            >
              Change greeting
            </label>
            <div style={{ display: 'flex' }}>
              <input
                autoComplete="off"
                defaultValue={greeting}
                id="greeting"
                onChange={onChange}
                style={{ flex: 1 }}
              />
              <button
                disabled={buttonDisabled}
                style={{ borderRadius: '0 5px 5px 0' }}
              >
                Save
              </button>
              <button onClick={onInit}>
                Init
              </button>
              <button onClick={nft_mint}>NFT_MINT</button>
            </div>
          </fieldset>
        </form>
      </main>
      {showNotification && <Notification />}
    </>
  )
}


