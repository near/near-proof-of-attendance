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
  NFTMetadata,
  Token,
  Storage,
  AccountId,

} from "./types"

// Storage
export const TokensPerOwner = new PersistentMap<AccountId, string>("tokens_per_owner");
export const TokensById = new PersistentMap<TokenId, Token>("tokens_by_id");
export const TokenMetadataById = new PersistentUnorderedMap<TokenId, TokenMetadata>("token_metadata_by_id");
export const OwnerId:string = "johnq.testnet";
export const ExtraStorageInBytesPerToken:u64 = 0;
// This string is gonna be a serialized object
export const Metadata:string = "";
