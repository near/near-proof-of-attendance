import { 
  Context, 
  logging, 
  storage,
  PersistentMap,
} from "near-sdk-as";

import {
  // TokensPerOwner,
  // TokensById,
  // TokenMetadataById,
  // OwnerId,
  // ExtraStorageInBytesPerToken,
  // Metadata,
  NFTMetadata,
} from './model';

import {
  AccountId,
  TokenId,
  Token,
  TokenMetadata,
  Promise,
  JsonToken,
  HashMap,

} from "./types";

let metadata = new PersistentMap<string, string>("metadata");
// This function should be called after contract gets deployed. In rust NEAR/core-contracts/nft-simple/src/lib.rs this function is called "new". 
export function init(owner_id: AccountId, nft_metadata: NFTMetadata): void {
  metadata.set("spec", nft_metadata.spec);
  metadata.set("name", nft_metadata.name);
  metadata.set("symbol", nft_metadata.symbol);
  metadata.set("icon", nft_metadata.icon);
  metadata.set("base_uri", nft_metadata.base_uri);
  metadata.set("reference", nft_metadata.reference);
  metadata.set("reference_hash", nft_metadata.reference_hash);
}

export function getNFTMetadataByKey(key: string): string | null {
  const logKey = 'getNFTMetadataByKey: ' + key;
  logging.log(logKey);
  return metadata.get(key);
}

// Internal functions extracted from "NEAR/core-contracts/nft-simple/src/internal.rs"
export function internal_add_token_to_owner(account_id: AccountId, token_id: TokenId): string | null {
  // TokensPerOwner.set(account_id, token_id);
  // const value = TokensPerOwner.get(account_id);
  // return value;
  return ""
}

export function internal_remove_token_from_owner(account_id: AccountId, token_id: TokenId): void {

}

export function internal_transfer(sender_id: AccountId, receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): string  {  // should return Token
  return ""
}

// mint function 
export function nft_mint(token_id: TokenId, metadata: TokenMetadata): void {
  
}

// NonFungibleTokenCore functions extracted from nft-simple rust 
export function nft_transfer(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): void {
  
}

export function nft_transfer_call(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string, msg: string): void {
  
}

export function nft_approve(token_id: TokenId, account_id: AccountId, msg: string | null): void {
  
}

export function nft_revoke(token_id: TokenId, account_id: AccountId,): void {
  
}

export function nft_total_supply(): u64 {
  return 0;
}
// should return JsonToken, for reason return JsonToken is giving an error
export function nft_token(token_id: TokenId): string {
  return "";
}

// NFT Event receiver
export function nft_on_transfer(sender_id: AccountId, previous_owner_id: AccountId, approval_id: u64, msg: string): void { // should return promise accourding "NEAR/core-contracts/nft-simple/src/nft_core.rs" versus return string. Does Promise exist in AssemblyScript?
  // return new Promise()
}

export function nft_on_approve(token_id: TokenId, owner_id: AccountId, approval_id: u64, msg: string): void {
  
}

export function nft_resolve_transfer(owner_id: AccountId, receiver_id: AccountId, approved_account_ids: HashMap, token_id: TokenId): boolean {
  return true;
}

// TODO: create nft_on_revoke event accourding to NEAR/core-contracts/nft-simple/src/nft_core.rs
export function nft_on_revoke(): void {

}

const DEFAULT_MESSAGE = "Hello";

export function getGreeting(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  const account_id = Context.sender
  // Use logging.log to record logs permanently to the blockchain!
  const messageLog = 'Saving greeting "' + message + '" for account "' + account_id + '"'
  logging.log(messageLog);
  storage.set(account_id, message);
}