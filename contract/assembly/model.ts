import {
  PersistentMap,
  PersistentUnorderedMap,
  PersistentSet,
  PersistentVector,
} from "near-sdk-as";

import {
  AccountId,
  TokenId,
  HashMap,
  UnorderedSet,
  TokenMetadata,
  Token,
  Storage,
  AccountId,

} from "./types"

@nearBindgen
export class NFTMetadata {
   spec: string; // required, essentially a version like "nft-1.0.0"
   name: string; // required, ex. "Mosaics"
   symbol: string; // required, ex. "MOSIAC"
   icon: string; // Data URL
   base_uri: string; // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
   reference: string; // URL to a JSON file with more info
   reference_hash: string; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
   constructor(spec: string, name: string, symbol: string, icon: string, base_uri: string, reference: string, reference_hash: string) {
     this.spec = spec;
     this.name = name;
     this.symbol = symbol;
     this.icon = icon;
     this.base_uri = base_uri;
     this.reference = reference;
     this.reference_hash = reference_hash;
   }
}

@nearBindgen
export class TokenMetadata {
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

@nearBindgen
export class Token {
  owner_id: string;
  approved_account_ids: anyref[];
  next_approval_id: i64;
}

// In theory this is already instanciated once we deploy our contracts.
// Storage
export const TokensPerOwner = new PersistentMap<AccountId, string>("tokens_per_owner");
// export const TokensById = new PersistentVector<TokenId>("tokens_by_id");
export const TokensById = new PersistentMap<TokenId, string>("tokens_by_id");
// export const TokenMetadataById = new PersistentUnorderedMap<TokenId, TokenMetadata>("token_metadata_by_id");
export const TokenMetadataById = new PersistentMap<TokenId, TokenMetadata>("token_metadata_by_id");

// hardcoded ownerId but this should be set upon deployment.
export const OwnerId:string = "johnq.testnet";

export const ExtraStorageInBytesPerToken:u64 = 0;
// This string is gonna be a serialized object
export const Metadata = new PersistentMap<string, string>("metadata");
