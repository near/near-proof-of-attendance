export interface Attendees {
  attended: boolean;
  attendedTime: number;
  name: string;
  walletId: string;
}

export type AccountId = String;

export interface NFTMetadata {
   spec: string; // required, essentially a version like "nft-1.0.0"
   name: string; // required, ex. "Mosaics"
   symbol: string; // required, ex. "MOSIAC"
   icon: string; // Data URL
   base_uri: string; // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
   reference: string; // URL to a JSON file with more info
   reference_hash: u64; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export interface ContractConfig {
  networkId: string;
  nodeUrl: string;
  contractName: string;
  walletUrl: string;
  explorerUrl: string;
  masterAccount?: string;
  helperUrl?: string; 
}