import {
  PersistentMap,
  PersistentUnorderedMap,
  PersistentSet,
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
   
   // constructor(spec: string, name: string, symbol: string, icon: string, base_uri: string, reference: string, reference_hash: string){
   //   this.spec = spec;
   //   this.name = name;
   //   this.symbol = symbol
   //   this.icon = icon;
   //   this.base_uri = base_uri;
   //   this.reference = reference;
   //   this.reference_hash = reference_hash;
   // }
}

// Storage
export const TokensPerOwner = new PersistentMap<AccountId, string>("tokens_per_owner");
export const TokensById = new PersistentMap<TokenId, Token>("tokens_by_id");
export const TokenMetadataById = new PersistentUnorderedMap<TokenId, TokenMetadata>("token_metadata_by_id");
export const OwnerId:string = "johnq.testnet";
export const ExtraStorageInBytesPerToken:u64 = 0;
// This string is gonna be a serialized object
export const Metadata = new PersistentMap<string, string>("metadata");
