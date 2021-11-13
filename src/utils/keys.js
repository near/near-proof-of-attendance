import { keyStores, connect, WalletConnection } from "near-api-js";

const config = {
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};
// This will extract the user's current fullaccess key from their wallet
export const getAccessKey = async () => {
  // Get the current logged in user
  const accountId = await window.currentUser.accountId;
  // Get an instance of a connection
  const near = await connect(config);
  const account = await near.account(accountId);
  // Instanciate wallet
  const wallet = new WalletConnection(near);
  const walletAccountObj = wallet.account();

  const userkey = walletAccountObj.walletConnection._authData.allKeys[0];
  // console.log(userkey)
  return userkey;
};
