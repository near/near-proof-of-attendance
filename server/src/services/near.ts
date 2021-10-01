import { connect, Contract, keyStores, WalletConnection, utils, transactions } from "near-api-js";
import BN from "bn.js";

import { getConfig } from "../config/contract";
import { getEnvVariables } from "../utils/environment";
import { AccountId, NFTMetadata } from "../types"

const CONTRACT_NAME = "proofofattedanceplayground.testnet";

export class NEAR {
  public accountId: AccountId | null = null;
  private contract: any;
  private methods: any;
  private static _instance: NEAR;


  private constructor() {}

  // Initialize contract & set global variables
  private async initialize() {
  // Initialize connection to the NEAR testnet
    // console.log('getEnvVariables().NODE_DEV', getEnvVariables().NODE_ENV);
    // console.log('getEnvVariables().CONTRACT_OWNER_PRIVATE_KEY', getEnvVariables().CONTRACT_OWNER_PRIVATE_KEY);
    const nearConfig = getConfig(getEnvVariables().NODE_ENV || "development");
    const privateKey = getEnvVariables().CONTRACT_OWNER_PRIVATE_KEY as string;
    const keyPair = utils.KeyPair.fromString(privateKey); 
    const keyStore = new keyStores.InMemoryKeyStore();
    keyStore.setKey('testnet', nearConfig.contractName, keyPair);

    const nearConnectConfig = {
      deps: {
        keyStore
      },
      ...nearConfig
    }

    const near = await connect(nearConnectConfig);
    // console.log('near', near);

    const init = {
      // "owner_id": `${owner_id}`, 
      "metadata": { 
        "spec": "SomeSpec", 
        "name": "SomeName", 
        "symbol":"SomeSymbol", 
        "icon": "SomeIcon", 
        "base_uri": "SomeBaseUri", 
        "reference": "SomeReference", 
        "reference_hash": "SomeReferenceHash" 
      }
    }

    const account = await near.account(CONTRACT_NAME);

    const one = new BN(1);

    const object = JSON.stringify(init.metadata);
    const functionCallData = {
      contractId: "proofofattedanceplayground.testnet",
      methodName: "init",
      args: { 
        owner_id: 'proofofattedanceplayground.testnet', 
        metadata: init.metadata 
      },
      // gas: one,
      // attachedDeposit: one,
      // Not needed.
      // walletMeta: '',
      // walletCallbackUrl: '',
    }
    const result = await account.functionCall(functionCallData);
     
    console.log('result', result);

    // Initializing our contract APIs by contract name and configuration
    const contractMethods = {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: [],
      // Change methods can modify the state. But you don't receive the returned value when called.
      // changeMethods: ['setGreeting', 'init'],
      changeMethods: ["init",'nft_mint'],
    }
    // Instanciate Contract Object
    // const contract = await new Contract(walletConnection.account(), nearConfig.contractName, contractMethods);
  }
  
  public static async getInstance() {
    if (!this._instance) {
      const instance = new NEAR();
      await instance.initialize();
      this._instance = instance;
    }
    return this._instance;
  }

}


