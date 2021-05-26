import {
  u128,
  ContractPromiseBatch,
} from "near-sdk-as";

import { 
  Gas,
  AccountId,
  Balance,
  TokenId,
  
} from "./types";

export const GAS_FOR_NFT_APPROVE: Gas = 10_000_000_000_000;
export const GAS_FOR_RESOLVE_TRANSFER: Gas = 10_000_000_000_000;
export const GAS_FOR_NFT_TRANSFER_CALL: Gas = 25_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER;
export const NO_DEPOSIT: Balance = u128.from(0);

// NonFungibleTokenCore functions extracted from nft-simple rust 
export function nft_transfer(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): void {
  
}

export function nft_transfer_call(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string, msg: string): void {
  
}

export function nft_approve(token_id: TokenId, account_id: AccountId, msg: string | null): void {
  
}

export function nft_revoke(token_id: TokenId, account_id: AccountId,): void {
  
}

export function nft_revoke_all(token_id: TokenId): void {
  
}

export function nft_total_supply(): u64 {
  return 0;
}
// should return JsonToken, for reason return JsonToken is giving an error
export function nft_token(token_id: TokenId): string {
  return "";
}

// NFT Event receiver
export function nft_on_transfer(sender_id: AccountId, previous_owner_id: AccountId, approval_id: u64, msg: string): void { // should return promise accourding "NEAR/core-contracts/nft-simple/src/nft_core.rs" versus return string. ContractPromiseBatch in AssemblyScript?
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