import { connect, Contract, keyStores, WalletConnection, utils, transactions, Account } from "near-api-js";
import BN from "bn.js";

import { getConfig } from "../config/contract";
import { getEnvVariables } from "../utils/environment";
import { TokenId, AccountId, NFTMetadata, TokenMetadata } from "../types";

// const CONTRACT_NAME = "proofofattedanceplayground.testnet";
// const CONTRACT_OWNER = "proofofattedanceplayground.testnet"
const { NODE_ENV, CONTRACT_OWNER_PRIVATE_KEY, PLAYGROUND, CONTRACT_NAME, CONTRACT_OWNER } = getEnvVariables();

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

    keyStore.setKey('testnet', "proofofattedanceplayground.testnet", keyPair);
    
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
    this.attachedDeposit = new BN('81106105');
  }
  
  public static async getInstance() {
    if (!this._instance) {
      const instance = new NEAR();
      await instance.initialize();
      this._instance = instance;
    }
    return this._instance;
  }

  public async mint(owner_id?: AccountId, token_id?: TokenId, metadata?: TokenMetadata) {
    const nft_mint = {
      owner_id: "johnq.testnet", 
      metadata: {
        "title": "SomeNFTTitle", 
        "description": "SomeNFTDesci", 
        "media": "https://ipfs.fleek.co/ipfs/bafybeiacydivfg63rxg7idoe6xamjcvwaf4ob47kii2sgxn5hkh2pupjga",  
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
  }
  
  public async batchMint(accountIds: any[], metadata: TokenMetadata) {
    const batchMint = async (account: any, index: number) => {
      console.log('account index', index);
      const random_string = Math.random().toString(36).substring(7);
      const random_token_id = account.walletId + "."+random_string + ".token_id";
      await this.mint(account.walletId, random_token_id, metadata);
    }
    accountIds.map(batchMint);
  }
  
  public async tokens_for_owner(accountId: string) {
    const args = {
      // owner_id: "johnq.testnet",
      account_id: accountId ? accountId : "johnq.testnet",
      // token_id: random_token_id,
    }
    const contractId = "proofofattedanceplayground.testnet"
    const methodName = "nft_tokens_for_owner"
    const functionCallData = {
      contractId,
      methodName,
      args,
      // gas: this.attachedDeposit,
      attachedDeposit: this.attachedDeposit,
    }
    const result = await this.account.functionCall(functionCallData);
    console.log('result', result);
  }
}


