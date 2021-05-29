// This file is called index.ts but it really mimics "NEAR/core-contracts/nft-simple/src/lib.rs"
import {
  PersistentMap,
  logging,
  storage
} from "near-sdk-as";

import {
  internal_add_token_to_owner,
  internal_remove_token_from_owner,
  internal_transfer,
} from "./internal";

import {
  NFTMetadata,
  TokenMetadata,
  TokenMetadataById
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
// n --> NFTMetada
// "o" --> tokens_per_owner
// "i" --> tokens_by_id
// "m" --> token_metadata_by_id

// Storage Variables
export const TokensPerOwner = new PersistentMap<AccountId, UnorderedSet>("o");

export const TokensById = new PersistentMap<TokenId, Token>("i");

// export const TokenMetadataById = new PersistentMap<TokenId, TokenMetadata>("m");

// hardcoded for now ownerId but this should be set upon deployment.
export const OwnerId: AccountId = "johnq.testnet";

export const ExtraStorageInBytesPerToken: StorageUsage = 0;
// This string is gonna be a serialized object
// export const Metadata = new PersistentMap<string, string>("metadata");
export const Metadata: NFTMetadata = new NFTMetadata("NFTSpec", "NF÷TName", "NFTSymbol", "NFTIcon", "NFTBaseURI", "NFTRef", "NFTRefHash");

// in "NEAR/core-contracts/nft-simple/src/lib.rs" this function is called "pub fn new(owner_id: ValidAccountId, metadata: NFTMetadata) and it returns this/self"
// We need to rename it to "init" because "new" is a keyword in AssemblyScript.
export function init(owner_id: AccountId, metadata: NFTMetadata): void {
  logging.log("I WORK!!!!!");
  const Metadata: NFTMetadata = new NFTMetadata(metadata.spec, metadata.name, metadata.symbol, metadata.icon, metadata.base_uri, metadata.reference, metadata.reference_hash);
  storage.set("n", Metadata);
}