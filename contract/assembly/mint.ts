import {
  Context,
  logging,

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
  AccountId,
} from "./types";

import {
  consoleLog
} from "./utils"

// renaming this to internal for now. But should find a way to make this specific function public. In theory this function should be called "nft_mint";
export function internal_nft_mint(owner_id: AccountId, token_id: TokenId, metadata: TokenMetadata): void {
  const initial_storage_usage = Context.storageUsage;
  const initial_attached_deposit = Context.attachedDeposit
  assert_owner();
  logging.log("after assert_owner()")
  const emptyMap = new Map<AccountId, i32>()
  
  const token: Token = new Token(owner_id, emptyMap, 0);
  const token_by_id = TokensById.get(token_id, null)
  assert(
    token_by_id == null,
    "Token already exists"
  );
  TokensById.set(token_id, token);
  TokenMetadataById.set(token_id, metadata);
  
  internal_add_token_to_owner(token.owner_id, token_id);
  logging.log("after internal_add_token_to_owner()");
  const new_token_size_in_bytes = Context.storageUsage - initial_storage_usage;
  const required_storage_in_bytes = ExtraStorageInBytesPerToken + new_token_size_in_bytes;
  // This is not working because attachedDeposit is "2" and it needs to be increased so it can be more than the required_cost.
  refund_deposit(required_storage_in_bytes);
  // logging.log("after refund_deposit()");
  // logging.log("I WORK!");
}
