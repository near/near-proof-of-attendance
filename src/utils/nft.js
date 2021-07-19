import { connect, Contract, keyStores, WalletConnection, utils } from "near-api-js";

import getConfig from "../config";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

export const { 
  networkId, 
  contractName,
 
} = nearConfig;

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const config = {
    deps: { 
      keyStore: new keyStores.BrowserLocalStorageKeyStore() 
    } 
  };
  const nearConnectConfig = Object.assign(config, nearConfig);
  const near = await connect(nearConnectConfig);

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  const walletConnection = new WalletConnection(near);
  window.walletConnection = walletConnection;

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();
  
  const contract = {
    // View methods are read only. They don't modify the state, but usually return some value.
    // viewMethods: ['getGreeting', 'getNFTMetadataByKey'],
    viewMethods: [],
    // Change methods can modify the state. But you don't receive the returned value when called.
    // changeMethods: ['setGreeting', 'init'],
    changeMethods: ["init",'nft_mint'],
  }

  window.contract = await new Contract(window.walletConnection.account(), contractName, contract)

}
const metadata = { 
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

const nft_token = {
  owner_id: "johnq.testnet", 
  token_id: "ajd6r232323l.token_id", 
  ...metadata
}

export async function test_nft_mint() {
  const gas = 300000000000000;
  const deposit_amount = 33914902;
  const nft_mint_arguments = {
    owner_id: "johnq.testnet.near", 
    token_id: nft_token.token_id, 
    metadata: nft_token.metadata,
  }
  
  window.contract.nft_mint(
    nft_mint_arguments,
    gas,
    deposit_amount  
  );
}
