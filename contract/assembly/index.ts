import { 
  Context, 
  logging, 
  storage,
  PersistentMap,
  PersistentUnorderedMap,
  PersistentSet,
} from "near-sdk-as";

import {
  TokensPerOwner,
  TokensById,
  TokenMetadataById,
  OwnerId,
  ExtraStorageInBytesPerToken,
  Metadata,
  NFTMetadata,
  TokenMetadata,
  Token,
} from './model';

import {
  AccountId,
  TokenId,
  // Token,
  Promise,
  JsonToken,
  HashMap,

} from "./types";

import {
  // log
} from "./utils"


// This should be exported from utils.ts.
declare namespace console {
   @external("console", "log")
   export function log(): void;
 }

// This function should be called after contract gets deployed. In rust NEAR/core-contracts/nft-simple/src/lib.rs this function is called "new". 

// let mut this = Self {
//     tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner.try_to_vec().unwrap()),
//     tokens_by_id: LookupMap::new(StorageKey::TokensById.try_to_vec().unwrap()),
//     token_metadata_by_id: UnorderedMap::new(
//         StorageKey::TokenMetadataById.try_to_vec().unwrap(),
//     ),
//     owner_id: owner_id.into(),
//     extra_storage_in_bytes_per_token: 0,
//     metadata: LazyOption::new(
//         StorageKey::NftMetadata.try_to_vec().unwrap(),
//         Some(&metadata),
//     ),
// };



export function init(owner_id: AccountId, nft_metadata: NFTMetadata): void {
  // In theory this function is equivalent to ```fn new() {...}
  // It should set OwnerIf of contract.
  storage.set("OwnerId", owner_id);
  
  // Mesuare the minimun token storage.
  // export const ExtraStorageInBytesPerToken:u64 = 0;
  
  // Instanciate our Storage.
  // export const TokensPerOwner = new PersistentMap<AccountId, string>("tokens_per_owner");
  // export const TokensById = new PersistentMap<TokenId, string>("tokens_by_id");
  // export const TokenMetadataById = new PersistentMap<TokenId, TokenMetadata>("token_metadata_by_id");
  
  // Set initial NFT Metadata.
  Metadata.set("spec", nft_metadata.spec);
  Metadata.set("name", nft_metadata.name);
  Metadata.set("symbol", nft_metadata.symbol);
  Metadata.set("icon", nft_metadata.icon);
  Metadata.set("base_uri", nft_metadata.base_uri);
  Metadata.set("reference", nft_metadata.reference);
  Metadata.set("reference_hash", nft_metadata.reference_hash);
}

// This function is made for testing.
export function getNFTMetadataByKey(key: string): string | null {
  const logKey = 'getNFTMetadataByKey: ' + key;
  logging.log(logKey);
  return "Metadata.get(key)";
}

// nft mint function 
export function nft_mint(token_id: TokenId, token_metadata: TokenMetadata): void {
  TokenMetadataById.set(token_id, token_metadata);
  internal_add_token_to_owner(OwnerId, token_id);
}

// pub fn nft_mint(&mut self, token_id: TokenId, metadata: TokenMetadata) {
//     let initial_storage_usage = env::storage_usage();
//     self.assert_owner();
//     let token = Token {
//         owner_id: self.owner_id.clone(),
//         approved_account_ids: Default::default(),
//         next_approval_id: 0,
//     };
//     assert!(
//         self.tokens_by_id.insert(&token_id, &token).is_none(),
//         "Token already exists"
//     );
//     self.token_metadata_by_id.insert(&token_id, &metadata);
//     self.internal_add_token_to_owner(&token.owner_id, &token_id);
// 
//     let new_token_size_in_bytes = env::storage_usage() - initial_storage_usage;
//     let required_storage_in_bytes =
//         self.extra_storage_in_bytes_per_token + new_token_size_in_bytes;
// 
//     refund_deposit(required_storage_in_bytes);
// }

// Internal functions extracted from "NEAR/core-contracts/nft-simple/src/internal.rs"
export function internal_add_token_to_owner(account_id: AccountId, token_id: TokenId): void {
  // log("internal_add_token_to_owner log2");
  const token_set = TokensPerOwner.get(account_id);
  if(!token_set) {
    // log("if !token_set");
  //   const token_set = new PersistentSet<string>("token_set");
  //   token_set.set(token_id);
  //   TokensPerOwner.set(account_id, token_set.toJSON());
  //   // TokensPerOwner.set(account_id, token_id);
  } else {
    // log("else");
    // token_set.set(token_id);
    // TokensPerOwner.set(account_id, token_set.toJSON());
  }
}

// pub(crate) fn internal_add_token_to_owner(
//     &mut self,
//     account_id: &AccountId,
//     token_id: &TokenId,
// ) {
//     let mut tokens_set = self.tokens_per_owner.get(account_id).unwrap_or_else(|| {
        // UnorderedSet::new(
        //     StorageKey::TokenPerOwnerInner {
        //         account_id_hash: hash_account_id(&account_id),
        //     }
        //     .try_to_vec()
        //     .unwrap(),
        // )
//     });
//     tokens_set.insert(token_id);
//     self.tokens_per_owner.insert(account_id, &tokens_set);
// }

export function internal_remove_token_from_owner(account_id: AccountId, token_id: TokenId): void {

}

export function internal_transfer(sender_id: AccountId, receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): string  {  // should return Token
  return ""
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