import { connect, Contract, keyStores, WalletConnection, utils, transactions, Account } from "near-api-js";
import BN from "bn.js";

import { getConfig } from "../config/contract";
import { nft_mint } from "../config/constants";
import { getEnvVariables } from "../utils/environment";
import sleep from "../utils/sleep";
import { chunk } from "../utils/array";

import { TokenId, AccountId, NFTMetadata, TokenMetadata, Attendee } from "../types";

// const CONTRACT_NAME = "proofofattedanceplayground.testnet";
// const CONTRACT_OWNER = "proofofattedanceplayground.testnet"
const DEFAULT_GAS = '300000000000000';
const DEFAULT_DEPOSIT = '300000000000000';
const { NODE_ENV, CONTRACT_OWNER_PRIVATE_KEY, CONTRACT_NAME, CONTRACT_OWNER } = getEnvVariables();

export class NEAR {
  public accountId: AccountId | null = null;
  public account: Account | any;
  public connection: any;
  public attachedDeposit: BN | any;
  public gas: BN | any;
  private contract: any;
  private methods: any;
  private static _instance: NEAR;

  private constructor() {}

  // Initialize contract & set global variables
  private async initialize() {
  // Initialize connection to the NEAR testnet
    const nearConfig = getConfig(NODE_ENV || "development");
    const privateKey = CONTRACT_OWNER_PRIVATE_KEY as string;
    const keyPair = utils.KeyPair.fromString(privateKey); 
    const keyStore = new keyStores.InMemoryKeyStore();

    keyStore.setKey('testnet', CONTRACT_OWNER as string, keyPair);
    
    const deps = {
      keyStore
    }

    const nearConnectConfig = {
      deps,
      ...nearConfig
    }
    const near = await connect(nearConnectConfig);
    this.connection = near;

    const account = await near.account(CONTRACT_NAME as string);
    this.account = account;
    const attachedDeposit = new BN(DEFAULT_DEPOSIT);
    const gas = new BN(DEFAULT_GAS);
    this.attachedDeposit = attachedDeposit;
    this.gas = gas;
  }
  
  public static async get_instance() {
    if (!this._instance) {
      const instance = new NEAR();
      await instance.initialize();
      this._instance = instance;
    }
    return this._instance;
  }

  public async mint(owner_id?: AccountId, token_id?: TokenId, metadata?: TokenMetadata) {
    try {
      const random_string = Math.random().toString(36).substring(7);
      const random_token_id = random_string + ".token_id";

      const args = {
        owner_id: owner_id ? owner_id : "johnq.testnet",
        token_id: token_id ? token_id : random_token_id,
        metadata: metadata ? metadata : nft_mint.metadata,
      }
      const contractId = "proofofattedanceplayground.testnet"
      const methodName = "nft_mint"
      const functionCallData = {
        contractId,
        methodName,
        args,
        gas: this.gas,
        attachedDeposit: this.attachedDeposit,
      }
      const result = await this.account.functionCall(functionCallData);
      console.log('result', result);
    } catch (error) {
      console.log('error in near service mint', error);
      return {
        error
      }
    }
  }
  
  public async mint_batch(accountIds: AccountId[], metadata: TokenMetadata) {
    const contractId = "proofofattedanceplayground.testnet"
    const methodName = "nft_mint_batch"
    try {
      // Convert 1 huge array of accountIds in to an array of arrays containing 5 elements of the original array.
      const results: any[] = []
      const chunked_accountIds = chunk(accountIds, 4);
      const chunked_accountIds_iter = async (accountIdsGroup: string[]) => {
        const args = {
          owner_ids: accountIdsGroup,
          metadata: metadata,
        }
        const functionCallData = {
          contractId,
          methodName,
          args,
          gas: this.gas,
          attachedDeposit: this.attachedDeposit,
        }
        const result = await this.account.functionCall(functionCallData);
        console.log('result', result);
        results.push(result);
      }
      // To implement chunked batch minting uncomment below line.
      chunked_accountIds.map(chunked_accountIds_iter);
      return { results };
    } catch (error) {
      console.log('error in near service mint_batch', error);
      return {
        error
      }
    }
  }
  // Offchain nft_mint_batch // No longer/not really needed.
  public async batch_mint(accountIds: AccountId[], metadata: TokenMetadata) {
    // Hard coded Testing how many accounts can we mint to.
    // accountIds = accountIds.slice(0, 6)
    try {
      console.log("Total Accounts to loop:", accountIds.length);
      const batch_mint_iter = async (account: any, index: number) => {
        await sleep(5000);
        const random_string = Math.random().toString(36).substring(7);
        const random_token_id = account + "."+random_string + ".token_id";
        console.log('account', account, 'random_token_id', random_token_id);
        await this.mint(account, random_token_id, metadata);
      }
      accountIds.map(batch_mint_iter);
    } catch (error) {
      console.log('error in near service batch_mint', error)
      return {
        error
      }
    }
  }
  
  public async tokens_for_owner(accountId: string) {
    const args = {
      account_id: accountId ? accountId : "johnq.testnet",
    }
    const methodName = "nft_tokens_for_owner"
    const result = await this.account.viewFunction(CONTRACT_NAME, methodName, args);
    return result
  }

  public async nft_token_per_owner(accountId: string) {
    const token_ids = await this.tokens_for_owner(accountId);
    const methodName = "nft_token";
    const tokens_iterator = async (token_id: string, index: number) => {
      const args = {
        token_id,
      }
      const result = await this.account.viewFunction(CONTRACT_NAME, methodName, args);
      return result;
    }
    const tokens = token_ids.map(tokens_iterator);
    const tokens_for_owner = await Promise.all(tokens);
    return tokens_for_owner
  }

}


