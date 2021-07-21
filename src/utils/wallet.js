import { Account, connect, keyStores } from "near-api-js";

import getConfig from "../config";

const nearConfig = getConfig("testnet");
const config = {
  deps: { 
    keyStore: new keyStores.BrowserLocalStorageKeyStore() 
  } 
};
const nearConnectConfig = Object.assign(config, nearConfig);

export const checkAccountIds = async (accounts, callback, callback2) => {
  const near = await connect(nearConnectConfig);
  const accountErrors = []
  const accountsNoErrors = []
  // print nonexisting account
  // console.log('await near.account(accounts[3].walletId)', await near.account(accounts[3].walletId));
  // accounts[3].walletId = a non existing testaccount https://explorer.testnet.near.org/accounts/captainrogers.testnet
  // const nonexisting = await near.account(accounts[3].walletId);
  // const ready = await nonexisting.ready;
  // console.log("Ready?", ready);
  accounts.map(async account => {
    try {
      await near.account(account.walletId)
      accountsNoErrors.push(account);
    } catch (error) {
      accountErrors.push(error);
    } finally {
      const accountsNotExist = accounts.filter(account => accountErrors.find( error => error.message.includes(account.walletId)));
      callback(accountsNoErrors);
      // For some weird reason we need to call setAccountsNotExist. In order to filter the attendees list with validateNEARAccounts.
      callback2(accountsNotExist)
    }
  });

}