import { connect, Contract, keyStores, WalletConnection, utils, transactions, Account, providers } from "near-api-js";
import BN from "bn.js";

import { getConfig } from "../config/contract";
import { getEnvVariables } from "../utils/environment";
import { TokenId, AccountId, NFTMetadata, TokenMetadata } from "../types";

// const CONTRACT_NAME = "proofofattedanceplayground.testnet";
// const CONTRACT_OWNER = "proofofattedanceplayground.testnet"
const { NODE_ENV, CONTRACT_OWNER_PRIVATE_KEY, PLAYGROUND, CONTRACT_NAME, CONTRACT_OWNER } = getEnvVariables();

const provider = new providers.JsonRpcProvider(
  "https://rpc.testnet.near.org"
);

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
  
  public async getState(query?: any) {
    
    //  query = {
    //   request_type: "call_function",
    //   account_id: "guest-book.testnet",
    //   method_name: "getMessages",
    //   args_base64: "e30=",
    //   finality: "optimistic",
    // }  
    // 
    // query = {
    //   request_type: "call_function",
    //   account_id: CONTRACT_NAME,
    //   method_name: "nft_tokens_for_owner",
    //   args_base64: "e30=",
    //   finality: "optimistic",
    // }
    // 
    // const query2 = {
    //   request_type: "call_function",
    //   account_id: CONTRACT_NAME,
    //   method_name: "nft_token",
    //   args_base64: "e30=",
    //   finality: "optimistic",
    // }
    
    // const rawResult = await provider.query(query);
    // const rawResult2 = await provider.query(query2);
    // format result
    // console.log("rawResult", rawResult);
    // console.log("rawResult2", rawResult2);
    // const res = JSON.parse(Buffer.from(rawResult.result).toString());
    // const res = JSON.parse(Buffer.from((rawResult as any).result).toString())
    // console.log('res', res);
    // return 'res'
    // this.account
  }
  
  public async instanciateContract() {
    // this.connection = near;
    // const walletConnection = new WalletConnection(near)
    // // Initializing our contract APIs by contract name and configuration
    // const contractMethods = {
    //   // View methods are read only. They don't modify the state, but usually return some value.
    //   viewMethods: ["nft_tokens_for_owner", "nft_token"],
    //   // Change methods can modify the state. But you don't receive the returned value when called.
    //   // changeMethods: ['setGreeting', 'init'],
    //   changeMethods: ["init",'nft_mint'],
    // }
    // this.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, contractMethods);
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
      account_id: accountId ? accountId : "johnq.testnet",
    }
    let methodName = "nft_tokens_for_owner"
    const result = await this.account.viewFunction(CONTRACT_NAME, methodName, args);
    return result
  }
  
  public async nft_token_per_owner(accountId: string) {
    const token_ids = await this.tokens_for_owner(accountId);
    const methodName = "nft_token";
    // console.log(Promise)
    // console.log('token_ids', token_ids);
    const tokens = token_ids.map(async (token_id: string, index: number) => {
      // if(index == 0 ) {
        const args = {
          token_id,
        }
        // console.log('this.account', this.account)
        const result = await this.account.viewFunction(CONTRACT_NAME, methodName, args);
        // console.log('result', result);
        return result;
      // }
      // return;
    });
    const nfts = Promise.all(tokens);
    return await nfts
    // console.log('tokens', tokens)
    // return tokens
  }

}


