import {
  Context
} from "near-sdk-as"
import {
  TokensById,
  OwnerId,
  // TokenMetadataById,
  ExtraStorageInBytesPerToken,
} from "./index";

import {
  TokenMetadata,
  TokenMetadataById,

} from "./metadata";

import {
  refund_deposit,
  internal_add_token_to_owner,
  assert_owner,
} from "./internal"

import {
  Token,

} from "./token";


import {
  TokenId,

} from "./types";

export function nft_mint(token_id: TokenId, metadata: TokenMetadata): void {
  const initial_storage_usage = Context.storageUsage;
  assert_owner();
  const token: Token = new Token(OwnerId, [], 0);
  assert(
      TokensById.get(token_id, null) !== null,
      "Token already exists"
  );
  TokenMetadataById.set(token_id, metadata);
  internal_add_token_to_owner(token.owner_id, token_id);
  
  const new_token_size_in_bytes = Context.storageUsage - initial_storage_usage;
  const required_storage_in_bytes = ExtraStorageInBytesPerToken + new_token_size_in_bytes;
  refund_deposit(required_storage_in_bytes);
}