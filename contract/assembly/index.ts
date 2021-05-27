// This file is called index.ts but it really mimics "NEAR/core-contracts/nft-simple/src/lib.rs"
import {
  PersistentMap,
  logging,
} from "near-sdk-as";

import {
  internal_add_token_to_owner,
  internal_remove_token_from_owner,
  internal_transfer,
} from "./internal";

import {
  NFTMetadata,
  TokenMetadata
} from "./metadata";

import {
  nft_mint,
} from "./mint";

import {
  GAS_FOR_NFT_APPROVE,
  GAS_FOR_RESOLVE_TRANSFER,
  GAS_FOR_NFT_TRANSFER_CALL,
  NO_DEPOSIT,
} from "./nft_core";

import {
  Token,
  JsonToken,
} from "./token";

import {
  AccountId,
  TokenId,
  UnorderedSet,
  AccountId,
  StorageUsage,
} from "./types";


// Extracted from NEAR/core-contracts/nft-simple/src/lib.rs
enum StorageKey {
  TokensPerOwner,
  TokenPerOwnerInner, // what is this in AssemblyScript? { account_id_hash: CryptoHash },
  TokensById,
  TokenMetadataById,
  NftMetadata,
}



// Storage one letter key Mappings
// "o" --> tokens_per_owner
// "i" --> tokens_by_id
// "m" --> token_metadata_by_id

// Storage Variables
export const TokensPerOwner = new PersistentMap<AccountId, UnorderedSet>("o");

export const TokensById = new PersistentMap<TokenId, string>("i");

export const TokenMetadataById = new PersistentMap<TokenId, TokenMetadata>("m");

// hardcoded for now ownerId but this should be set upon deployment.
export const OwnerId: AccountId = "johnq.testnet";

export const ExtraStorageInBytesPerToken: StorageUsage = 0;
// This string is gonna be a serialized object
// export const Metadata = new PersistentMap<string, string>("metadata");
export const Metadata: NFTMetadata = new NFTMetadata("NFTSpec", "NFTName", "NFTSymbol", "NFTIcon", "NFTBaseURI", "NFTRef", "NFTRefHash");

// in "NEAR/core-contracts/nft-simple/src/lib.rs" this function is called "pub fn new(owner_id: ValidAccountId, metadata: NFTMetadata) and it returns this/self"
// We need to rename it to "init" because "new" is a keyword in AssemblyScript.
export function init(owner_id: AccountId, metadata: NFTMetadata): void {
  logging.log("I WORK!!!!!");
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
  // 
  // this.measure_min_token_storage_cost();
  measure_min_token_storage_cost();
  // 
  // this
}

export function measure_min_token_storage_cost(): void {
  logging.log("measure_min_token_storage_cost is called");
  //     let initial_storage_usage = env::storage_usage();
  //     let tmp_account_id = "a".repeat(64);
  //     let u = UnorderedSet::new(
  //         StorageKey::TokenPerOwnerInner {
  //             account_id_hash: hash_account_id(&tmp_account_id),
  //         }
  //         .try_to_vec()
  //         .unwrap(),
  //     );
  //     self.tokens_per_owner.insert(&tmp_account_id, &u);
  
  //     let tokens_per_owner_entry_in_bytes = env::storage_usage() - initial_storage_usage;
  //     let owner_id_extra_cost_in_bytes = (tmp_account_id.len() - self.owner_id.len()) as u64;
  
  //     self.extra_storage_in_bytes_per_token =
  //         tokens_per_owner_entry_in_bytes + owner_id_extra_cost_in_bytes;
  
  //     self.tokens_per_owner.remove(&tmp_account_id);
}