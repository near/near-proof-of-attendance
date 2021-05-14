import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

// global variable used throughout
let currentGreeting

const submitButton = document.querySelector('form button')
const initButton = document.querySelector('#init')

document.querySelector('form').onsubmit = async (event) => {
  event.preventDefault()

  // get elements from the form using their id attribute
  const { fieldset, greeting } = event.target.elements

  // disable the form while the value gets updated on-chain
  fieldset.disabled = true

  try {
    // make an update call to the smart contract
    await window.contract.setGreeting({
      // pass the value that the user entered in the greeting field
      message: greeting.value
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

  // disable the save button, since it now matches the persisted value
  submitButton.disabled = true

  // update the greeting in the UI
  await fetchGreeting()

  // show notification
  document.querySelector('[data-behavior=notification]').style.display = 'block'

  // remove notification again after css animation completes
  // this allows it to be shown again next time the form is submitted
  setTimeout(() => {
    document.querySelector('[data-behavior=notification]').style.display = 'none'
  }, 11000)
}

// this should be dynamic and extracted from a UI inputs/form.
const set_nft_metadata = {
  spec: "SPEC IS WORKING",
  name: "SomeName",
  symbol: "SomeSymbol",
  icon: "SomeIcon",
  base_uri: "SomeBase_uri",
  reference: "SomeReference",
  reference_hash: "SomeReference_hash"
}

// User should be able to deploy contract with corresponding NFT Metadata and call the init function. Init function should only be able to call once & only once upon deployment.
// This function should be call in order for us to set NFT Metadata upon deployment.
async function init(event) {
  event.preventDefault();
  try {
    const initParams = {
      owner_id: "johnq.testnet",
      nft_metadata: set_nft_metadata,
    }
    const init = await window.contract.init(initParams)
    const { getNFTMetadataByKey } = await window.contract
    // This getter should actually come from one function call where to it return all values of UnorderedMap or AVLTree. 
    // Using AVLTree.values() & UnorderedMap.values() was giving me an error, so for now it is return each key value.
    const spec = await getNFTMetadataByKey({key: "spec"})
    const name = await getNFTMetadataByKey({key: "name"})
    const symbol = await getNFTMetadataByKey({key: "symbol"})
    const icon = await getNFTMetadataByKey({key: "icon"})
    const base_uri = await getNFTMetadataByKey({key: "base_uri"})
    const reference = await getNFTMetadataByKey({key: "reference"})
    const reference_hash = await getNFTMetadataByKey({key: "reference_hash"})
    const nft_metadata = {
      spec,
      name,
      symbol,
      icon,
      base_uri,
      reference,
      reference_hash,
    }
    console.log("nft_metadata", nft_metadata)
  } catch (e) {
    console.log('catch e', e);
  }
}

initButton.addEventListener("click", init);


document.querySelector('input#greeting').oninput = (event) => {
  if (event.target.value !== currentGreeting) {
    submitButton.disabled = false
  } else {
    submitButton.disabled = true
  }
}

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })

  // populate links in the notification box
  const accountLink = document.querySelector('[data-behavior=notification] a:nth-of-type(1)')
  accountLink.href = accountLink.href + window.accountId
  accountLink.innerText = '@' + window.accountId
  const contractLink = document.querySelector('[data-behavior=notification] a:nth-of-type(2)')
  contractLink.href = contractLink.href + window.contract.contractId
  contractLink.innerText = '@' + window.contract.contractId

  // update with selected networkId
  accountLink.href = accountLink.href.replace('testnet', networkId)
  contractLink.href = contractLink.href.replace('testnet', networkId)

  fetchGreeting()
}

// update global currentGreeting variable; update DOM with it
async function fetchGreeting() {
  currentGreeting = await contract.getGreeting({ accountId: window.accountId })
  document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
    // set divs, spans, etc
    el.innerText = currentGreeting

    // set input elements
    el.value = currentGreeting
  })
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) signedInFlow()
    else signedOutFlow()
  })
  .catch(console.error)
