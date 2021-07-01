import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import BN from "bn.js"

import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const nft_token = {
  "owner_id": "johnq.testnet", 
  "token_id": `ajd6rl.token_id`, 
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


// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()
  
  const contract = {
    // View methods are read only. They don't modify the state, but usually return some value.
    // viewMethods: ['getGreeting', 'getNFTMetadataByKey'],
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    // changeMethods: ['setGreeting', 'init'],
    changeMethods: ["init",'nft_mint'],
  }

  // // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    // viewMethods: ['getGreeting', 'getNFTMetadataByKey'],
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    // changeMethods: ['setGreeting', 'init'],
    changeMethods: ['nft_mint'],
  })
  
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, contract)

}

export async function test_nft_mint() {
  const nft_mint_arguments = {
    owner_id: "johnq.testnet.near", 
    token_id: nft_token.token_id, 
    metadata: nft_token.metadata
  }
  window.contract.nft_mint(
    nft_mint_arguments,
    //  Extracted from https://github.com/near/near-api-js/blob/master/examples/quick-reference.md 
    300000000000000, // attached GAS (optional)
    1000000000000000000000000 // attached deposit in yoctoNEAR (optional)
  )
}
