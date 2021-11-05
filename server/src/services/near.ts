import { connect, Contract, keyStores, WalletConnection, utils, transactions, Account } from "near-api-js";
import BN from "bn.js";

import { getConfig } from "../config/contract";
import { nft_mint } from "../config/constants";
import { getEnvVariables } from "../utils/environment";
import { TokenId, AccountId, NFTMetadata, TokenMetadata, Attendee } from "../types";

// const CONTRACT_NAME = "proofofattedanceplayground.testnet";
// const CONTRACT_OWNER = "proofofattedanceplayground.testnet"
const { NODE_ENV, CONTRACT_OWNER_PRIVATE_KEY, CONTRACT_NAME, CONTRACT_OWNER } = getEnvVariables();

export class NEAR {
  public accountId: AccountId | null = null;
  public account: Account | any;
  public connection: any;
  public attachedDeposit: BN | any;
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
    
    const attachedDeposit = new BN('40840562200000');
    // const attachedDeposit = new BN('199999999');
    // const attachedDeposit = new BN('308405622');
    // const attachedDeposit = new BN('408405622');
    // const attachedDeposit = new BN('508405622');
    // const attachedDeposit = new BN('608405622');
    this.attachedDeposit = attachedDeposit;
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
        // gas: this.attachedDeposit,
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
    try {
      const random_string = Math.random().toString(36).substring(7);
      const random_token_id = random_string + ".token_id";
      const args = {
        owner_ids: accountIds,
        metadata: metadata
      }
      const contractId = "proofofattedanceplayground.testnet"
      const methodName = "nft_mint_batch"
      const functionCallData = {
        contractId,
        methodName,
        args,
        gas: this.attachedDeposit,
        attachedDeposit: this.attachedDeposit,
      }
      const result = await this.account.functionCall(functionCallData);
      console.log('result', result);
    } catch (error) {
      console.log('error in near service mint_batch', error);
      return {
        error
      }
    }
  }

  public async batch_mint(accountIds: Attendee[], metadata: TokenMetadata) {
    try {
      const batch_mint_iter = async (account: any, index: number) => {
        console.log('account index', index);
        const random_string = Math.random().toString(36).substring(7);
        const random_token_id = account.walletId + "."+random_string + ".token_id";
        await this.mint(account.walletId, random_token_id, metadata);
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
    const nfts = await Promise.all(tokens);
    return nfts
  }

}


