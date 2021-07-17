import { Account, connect, keyStores } from "near-api-js";

import getConfig from "../config";

const nearConfig = getConfig("testnet");
const config = {
  deps: { 
    keyStore: new keyStores.BrowserLocalStorageKeyStore() 
  } 
};
const nearConnectConfig = Object.assign(config, nearConfig);

export const checkAccountIds = async (accounts, callback) => {
  const near = await connect(nearConnectConfig);
  const accountErrors = []
  accounts.map(async account => {
    try {
      await near.account(account.walletId)
      console.log('account', account);
    } catch (error) {
      console.dir('error', error)
      console.log('account error', account);
      accountErrors.push(error);
      // return account
      // console.log(accountsNotExist)
    } finally {
      console.dir(accountErrors)
      const accountsNotExist = accounts.filter(account => accountErrors.find( error => error.message.includes(account.walletId)))
      console.dir(accountsNotExist)
      callback(accountsNotExist)
    }
  });

}