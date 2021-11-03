import {
  Context,
  logging,
} from "near-sdk-as";

import {
  TokensById,
  OwnerId,
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
} from "./internal";

import {
  Token,

} from "./token";


import {
  TokenId,
  AccountId,
} from "./types";

import {
  consoleLog
} from "./utils";

// renaming this to internal for now. But should find a way to make this specific function public. In theory this function should be called "nft_mint";
export function internal_nft_mint(owner_id: AccountId, token_id: TokenId, metadata: TokenMetadata): void {
  const initial_storage_usage = Context.storageUsage;
  const initial_attached_deposit = Context.attachedDeposit
  assert_owner();
  // logging.log("after assert_owner()");
  const emptyMap = new Map<AccountId, i32>();
  
  const token: Token = new Token(owner_id, emptyMap, 0, metadata);
  const token_by_id = TokensById.get(token_id, null);
  assert(
    token_by_id == null,
    "Token already exists"
  );
  TokensById.set(token_id, token);
  TokenMetadataById.set(token_id, metadata);
  
  internal_add_token_to_owner(token.owner_id, token_id);
  // logging.log("after internal_add_token_to_owner()");
  const new_token_size_in_bytes = Context.storageUsage - initial_storage_usage;
  const required_storage_in_bytes = ExtraStorageInBytesPerToken + new_token_size_in_bytes;
  refund_deposit(required_storage_in_bytes);
  // logging.log("after refund_deposit()");
  logging.log("I WORK!");
  consoleLog('I WORK!');
}

export function internal_nft_mint_batch(owner_ids: AccountId[], metadata: TokenMetadata): void {
  for (let index = 0; index < owner_ids.length; ++index) {
    // consoleLog("index");
    // consoleLog(index.toString());
    const random = (Math.random() * 10).toString().slice(0, 5);
    const random_token_id: string = owner_ids[index] + '.' + random + '.token_id';
    internal_nft_mint(owner_ids[index], random_token_id, metadata);  
  }
}

