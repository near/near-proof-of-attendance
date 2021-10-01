import { connect, Contract, keyStores, WalletConnection } from "near-api-js"
import { init, requestSignIn } from "@textile/near-storage"

import getConfig from "../config"

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const nearConfig = getConfig(process.env.NODE_ENV || "development");
  const nearConnectConfig = {
    deps: {
      keyStore: new keyStores.BrowserLocalStorageKeyStore() 
    },
    ...nearConfig
  }

  const near = await connect(nearConnectConfig);

  // Needed to access wallet
  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  const walletConnection = new WalletConnection(near)
  window.walletConnection = walletConnection;


  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  const contractMethods = {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    // changeMethods: ['setGreeting', 'init'],
    changeMethods: ["init",'nft_mint'],
  }
  
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, contractMethods);
  // Load in account data
  if (walletConnection.getAccountId()) {
    window.currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount
    };
  }
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  
  // Old login logic below without @textile/near-storage module
  // window.walletConnection.requestSignIn(nearConfig.contractName)
  
  // login logic with @textile/near-storage module. This will be remove if we end not using @textile/near-storage module
  requestSignIn(window.walletConnection, {});
}



