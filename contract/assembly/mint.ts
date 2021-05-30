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
export function internal_nft_mint(token_id: TokenId, metadata: TokenMetadata): void {
  consoleLog("internal_nft_mint");
  const initial_storage_usage = Context.storageUsage;
  consoleLog("initial_storage_usage");
  consoleLog(initial_storage_usage.toString());
  const initial_attached_deposit = Context.attachedDeposit
  consoleLog("initial_attached_deposit");
  consoleLog(initial_attached_deposit.toString());
  consoleLog("1 Context.storageUsage.toString()");
  consoleLog(Context.storageUsage.toString());
  assert_owner(OwnerId);
  logging.log("after assert_owner()")
  const emptyMap = new Map<AccountId, u64>()
  const token: Token = new Token(OwnerId, emptyMap, 0);
  const token_by_id = TokensById.get(token_id, null)  
  logging.log("1 token_by_id");
  logging.log(token_by_id);
  consoleLog("2 Context.storageUsage.toString()");
  consoleLog(Context.storageUsage.toString());
  assert(
    token_by_id == null,
    "Token already exists"
  );
  TokenMetadataById.set(token_id, metadata);
  
  consoleLog("consoleLog: before internal_add_token_to_owner()");
  consoleLog("3 Context.storageUsage.toString()");
  consoleLog(Context.storageUsage.toString());
  
  internal_add_token_to_owner(token.owner_id, token_id);
  
  const token_by_id2 = TokensById.get(token_id, null);
  logging.log("2 token_by_id");
  logging.log(token_by_id2);
  
  consoleLog("4 Context.storageUsage.toString()");
  consoleLog(Context.storageUsage.toString());
  consoleLog("after internal_add_token_to_owner()");
  consoleLog("consoleLog: after internal_add_token_to_owner()");
  logging.log("after internal_add_token_to_owner()");
  consoleLog("after Context.storageUsage");
  consoleLog(Context.storageUsage.toString());
  const new_token_size_in_bytes = Context.storageUsage - initial_storage_usage;
  consoleLog("internal_add_token_to_owner Context.storageUsage");
  consoleLog(Context.storageUsage.toString());
  const required_storage_in_bytes = ExtraStorageInBytesPerToken + new_token_size_in_bytes;
  // This is not working because attachedDeposit is "2" and it needs to be increased so it can be more than the required_cost.
  refund_deposit(required_storage_in_bytes);
  logging.log("after refund_deposit()");
  logging.log("I WORK!");
}
