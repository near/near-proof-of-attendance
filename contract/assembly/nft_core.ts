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
} from "./lib";

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
  HashMap,
} from "./types";

export const GAS_FOR_NFT_APPROVE: Gas = 10_000_000_000_000;
export const GAS_FOR_RESOLVE_TRANSFER: Gas = 10_000_000_000_000;
export const GAS_FOR_NFT_TRANSFER_CALL: Gas = 25_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER;
export const NO_DEPOSIT: Balance = u128.from(0);

// Pending functions to translate nft_transfer_call, nft_on_transfer, nft_resolve_transfer, 
// Approval standard methods:nft_revoke_all, nft_revoke, nft_on_revoke, nft_approve, nft_on_approve.

// NonFungibleTokenCore functions extracted from nft-simple rust 
export function internal_nft_transfer(receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): void {
  assert_one_yocto();
  const sender_id = Context.predecessor;
  const previous_token: Token = internal_transfer(sender_id, receiver_id, token_id, approval_id, memo)
  internal_transfer(sender_id, receiver_id, token_id, approval_id, memo)
  // let sender_id = env::predecessor_account_id();
  // let previous_token = self.internal_transfer(
  //     &sender_id,
  //     receiver_id.as_ref(),
  //     &token_id,
  //     approval_id,
  //     memo,
  // );
  refund_approved_account_ids(
      previous_token.owner_id,
      previous_token.approved_account_ids,
  );
}


// View Functions
export function internal_nft_total_supply(): i32 {
  // self.token_metadata_by_id.len().into()
  return TokenMetadataById.length;
}

// should return JsonToken.
export function internal_nft_token(token_id: TokenId): JsonToken | null {
  const token: Token | null = TokensById.get(token_id);
  if(token) {
    const metadata: TokenMetadata | null = TokenMetadataById.get(token_id, null);
    const json_token = new JsonToken(token_id, token.owner_id, metadata, token.approved_account_ids);
    return json_token;
  }
  // if let Some(token) = self.tokens_by_id.get(&token_id) {
  //   let metadata = self.token_metadata_by_id.get(&token_id).unwrap();
  //   Some(JsonToken {
  //       token_id,
  //       owner_id: token.owner_id,
  //       metadata,
  //       approved_account_ids: token.approved_account_ids,
  //   })
  // } else {
  //     None
  // }
  return null;
}

// This should return Token[] but TokensPerOwner.get(account_id) returns PersistentSet<TokenId> | null How can PersistentSet become Token[]?
// missing arguments after owner_id argument are: from_index: string, limit: number
export function internal_nft_tokens_for_owner(account_id: string): Set<TokenId> | null {
  // Not using from_index and limit for now.
  return TokensPerOwner.get(account_id);
}