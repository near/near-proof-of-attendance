import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import { init, requestSignIn } from "@textile/near-storage"

import getConfig from '../config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
  // const nearConfig = getConfig(ENV.NODE_ENV as any || 'testnet');
  // 
  // // Initializing connection to the NEAR TestNet
  // const near = await connect({
  //   deps: {
  //     keyStore: new keyStores.BrowserLocalStorageKeyStore()
  //   },
  //   ...nearConfig
  // });

  // Needed to access wallet
  // const walletConnection = new WalletConnection(near, null);
  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  const walletConnection = new WalletConnection(near)
  window.walletConnection = walletConnection;
  // const api = await init(window.walletConnection.account(), { contractId: 'filecoin-bridge.testnet' })
  window.api = await init(window.walletConnection.account(), { contractId: 'filecoin-bridge.testnet' })
  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    // viewMethods: ['getGreeting', 'getNFTMetadataByKey'],
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    // changeMethods: ['setGreeting', 'init'],
    changeMethods: ['init'],
  })
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

// export function login() {
//   // Allow the current app to make calls to the specified contract on the
//   // user's behalf.
//   // This works by creating a new access key for the user's account and storing
//   // the private key in localStorage.
//   window.walletConnection.requestSignIn(nearConfig.contractName)
// }

export function login() {
  requestSignIn(window.walletConnection, {});
}

