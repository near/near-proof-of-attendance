
function getConfig(env) {
  env = "testnet"
  switch (env) {
  case 'production':
  case 'mainnet':
    return {
      networkId: process.env.CONFIG_NETWORK_ID,
      nodeUrl: process.env.CONFIG_NODE_URL,
      contractName: process.env.CONFIG_CONTRACT_NAME,
      walletUrl: process.env.CONFIG_WALLET_URL,
      helperUrl: process.env.CONFIG_HELPER_URL,
      explorerUrl: process.env.CONFIG_EXPLORER_URL,
    }
  case 'development':
  case 'testnet':
    return {
      networkId: process.env.CONFIG_NETWORK_ID,
      nodeUrl: process.env.CONFIG_NODE_URL,
      contractName: process.env.CONFIG_CONTRACT_NAME,
      walletUrl: process.env.CONFIG_WALLET_URL,
      helperUrl: process.env.CONFIG_HELPER_URL,
      explorerUrl: process.env.CONFIG_EXPLORER_URL,
    }
  case 'betanet':
    return {
      networkId: process.env.CONFIG_NETWORK_ID,
      nodeUrl: process.env.CONFIG_NODE_URL,
      contractName: process.env.CONFIG_CONTRACT_NAME,
      walletUrl: process.env.CONFIG_WALLET_URL,
      helperUrl: process.env.CONFIG_HELPER_URL,
      explorerUrl: process.env.CONFIG_EXPLORER_URL,
    }
  case 'local':
    return {
      networkId: process.env.CONFIG_NETWORK_ID,
      nodeUrl: process.env.CONFIG_NODE_URL,
      keyPath: `${process.env.HOME}${process.env.CONFIG_KEY_PATH}`,
      walletUrl: process.env.CONFIG_WALLET_URL,
      contractName: process.env.CONFIG_CONTRACT_NAME,
    }
  case 'test':
  case 'ci':
    return {
      networkId: process.env.CONFIG_NETWORK_ID,
      nodeUrl: process.env.CONFIG_NODE_URL,
      contractName: process.env.CONFIG_CONTRACT_NAME,
      masterAccount: process.env.CONFIG_MASTER_ACCOUNT,
    }
  case 'ci-betanet':
    return {
      networkId: process.env.CONFIG_NETWORK_ID,
      nodeUrl: process.env.CONFIG_NODE_URL,
      contractName: process.env.CONFIG_CONTRACT_NAME,
      masterAccount: process.env.CONFIG_MASTER_ACCOUNT,
    }
  default:
    throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}

module.exports = getConfig
