export interface Attendees {
  attended: boolean;
  attendedTime: number;
  name: string;
  walletId: string;
}

export type AccountId = string;

export type TokenId = string;

export interface NFTMetadata {
   spec: string; // required, essentially a version like "nft-1.0.0"
   name: string; // required, ex. "Mosaics"
   symbol: string; // required, ex. "MOSIAC"
   icon: string; // Data URL
   base_uri: string; // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
   reference: string; // URL to a JSON file with more info
   // reference_hash: u64; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
   reference_hash: number; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export interface TokenMetadata {
    title: string; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    description: string; // free-form description
    media: string; // URL to associated media; preferably to decentralized; content-addressed storage
    media_hash: u64; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    copies: u64; // number of copies of this set of metadata in existence when token was minted.
    issued_at: string; // ISO 8601 datetime when token was issued or minted
    expires_at: string; // ISO 8601 datetime when token expires
    starts_at: string; // ISO 8601 datetime when token starts being valid
    updated_at: string; // ISO 8601 datetime when token was last updated
    extra: string; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    reference: string; // URL to an off-chain JSON file with more info.
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