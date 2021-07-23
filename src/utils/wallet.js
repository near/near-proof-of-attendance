import { Account, connect, keyStores, providers } from "near-api-js";

import getConfig from "../config";

const nearConfig = getConfig("testnet");
const config = {
  deps: { 
    keyStore: new keyStores.BrowserLocalStorageKeyStore() 
  } 
};
const nearConnectConfig = Object.assign(config, nearConfig);

const provider = new providers.JsonRpcProvider(nearConfig.nodeUrl);

export const checkAccountIds = async (accounts, callback, callback2) => {
  const near = await connect(nearConnectConfig);
  const accountErrors = []
  const accountsNoErrors = []
  const accountChecks = accounts.map(async account => {
    try {
      const queryAccount = await provider.query(`account/${account.walletId}`, "")
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