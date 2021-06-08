// This file is called index.ts but it really mimics "NEAR/core-contracts/nft-simple/src/lib.rs"
import {
  PersistentMap,
  logging,
  storage,
  PersistentSet,
} from "near-sdk-as";

import {
  NFTMetadata,
  TokenMetadata,
} from "./metadata";

import {
  internal_nft_mint,
} from "./mint";

import {
  internal_nft_transfer,
} from "./nft_core";

import {
  Token,
} from "./token";

import {
  AccountId,
  TokenId,
  UnorderedSet,
  StorageUsage,
} from "./types";


// Extracted from NEAR/core-contracts/nft-simple/src/lib.rs. Not used for now.
enum StorageKey {
  TokensPerOwner,
  TokenPerOwnerInner, // what is this in AssemblyScript? { account_id_hash: CryptoHash },
  TokensById,
  TokenMetadataById,
  NftMetadata,
}

// Storage one letter key Mappings
// n --> NFTMetada
// "o" --> tokens_per_owner
// "i" --> tokens_by_id
// "m" --> token_metadata_by_id

// Storage Variables
export const TokensPerOwner = new PersistentMap<AccountId, PersistentSet<string> | null>("o");
export const TokensById = new PersistentMap<TokenId, Token>("i");

// hardcoded for now ownerId but this should be set upon deployment.
// This should be a Escrow Account where the Event Manager would use for minting to attendees. TBD with Cameron.
export const OwnerId: AccountId = "johnq.testnet";
// For Testing suite use "carol";
// export const OwnerId: AccountId = "carol";

export const ExtraStorageInBytesPerToken: StorageUsage = 0;
// export const Metadata: NFTMetadata = new NFTMetadata("NFTSpec", "NF÷TName", "NFTSymbol", "NFTIcon", "NFTBaseURI", "NFTRef", 123123123);

// in "NEAR/core-contracts/nft-simple/src/lib.rs" this function is called "pub fn new(owner_id: ValidAccountId, metadata: NFTMetadata) and it returns this/self"
// We need to rename it to "init" because "new" is a keyword in AssemblyScript.
export function init(owner_id: AccountId, metadata: NFTMetadata): void {
  logging.log("I WORK!!!!!");
  logging.log("OwnerID:" + " " + OwnerId);
  logging.log("owner_id:" + " " + owner_id);
  const Metadata: NFTMetadata = new NFTMetadata(metadata.spec, metadata.name, metadata.symbol, metadata.icon, metadata.base_uri, metadata.reference, metadata.reference_hash);
  storage.set("n", Metadata);
}

export function nft_mint(owner_id: AccountId, token_id: TokenId, metadata: TokenMetadata): void {
  internal_nft_mint(owner_id, token_id, metadata);
}

export function nft_transfer(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): void {
  internal_nft_transfer(receiver_id, token_id, approval_id, memo);
}