import {
  u128,
  Context,
  storage,
  logging,
  PersistentUnorderedMap,
  PersistentSet,
} from "near-sdk-as";

import {
  TokensById,
  TokensPerOwner,
} from "./index";

import {
  TokenMetadata,
  TokenMetadataById
} from "./metadata";

import {
  assert_one_yocto,
  assert_at_least_one_yocto,
  refund_approved_account_ids,
  refund_approved_account_ids_iter,
  internal_transfer,
  internal_add_token_to_owner,
  internal_remove_token_from_owner,
} from "./internal";

import {
  JsonToken,
  Token
} from "./token";

import { 
  Gas,
  AccountId,
  Balance,
  TokenId,
} from "./types";

// In rust core-contracts/nft-simple this variables are defined but seem to not be needed.
// export const GAS_FOR_NFT_APPROVE: Gas = 10_000_000_000_000;
// export const GAS_FOR_RESOLVE_TRANSFER: Gas = 10_000_000_000_000;
// export const GAS_FOR_NFT_TRANSFER_CALL: Gas = 25_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER;
// export const NO_DEPOSIT: Balance = u128.from(0);

// TODO:
// Pending functions to translate: nft_transfer_call, nft_on_transfer, nft_resolve_transfer, 
// Approval event standard functions:nft_revoke_all, nft_revoke, nft_on_revoke, nft_approve, nft_on_approve.

// NonFungibleTokenCore functions extracted from core-contracts/nft-simple written in rust 
export function internal_nft_transfer(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): void {
  assert_one_yocto();
  const sender_id = Context.predecessor;
  const previous_token: Token = internal_transfer(sender_id, receiver_id, token_id, approval_id, memo)
  internal_transfer(sender_id, receiver_id, token_id, approval_id, memo)
  refund_approved_account_ids(
      previous_token.owner_id,
      previous_token.approved_account_ids,
  );
}

// View Functions
export function internal_nft_total_supply(): i32 {
  return TokenMetadataById.length;
}

// should return JsonToken.
export function internal_nft_token(token_id: TokenId): JsonToken | null {
  const token = TokensById.get(token_id);
  if(token) {
    const metadata = TokenMetadataById.get(token_id, null);
    const json_token = new JsonToken(token_id, token.owner_id, metadata, token.approved_account_ids);
    return json_token;
  }
  return null;
}

// This should return Token[] but TokensPerOwner.get(account_id) returns PersistentSet<TokenId> | null How can PersistentSet become Token[]?
// for now missing arguments after owner_id argument are: from_index: string, limit: number:
export function internal_nft_tokens_for_owner(account_id: string): Set<TokenId> | null {
  // Not using from_index and limit for now.
  return TokensPerOwner.get(account_id);
}