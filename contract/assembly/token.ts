import {
  TokenMetadata,  
} from "./metadata";

import {
  TokenId,
  AccountId,
} from "./types"


@nearBindgen
export class Token {
  owner_id: AccountId;
  approved_account_ids: Map<AccountId, i32>;
  next_approval_id: i64;
  constructor(
    owner_id: string,
    approved_account_ids: Map<AccountId, i32>,
    next_approval_id: i64) {
      this.owner_id = owner_id;
      this.approved_account_ids = approved_account_ids;
      this.next_approval_id = next_approval_id;
    }
}

@nearBindgen
export class JsonToken {
  token_id: TokenId;
  owner_id: AccountId | null;
  metadata: TokenMetadata | null;
  approved_account_id: Map<AccountId, u64>;
  constructor(
    token_id: TokenId,
    owner_id: string,
    metadata: TokenMetadata,
    approved_account_id: Map<AccountId, u64>
  ) {
    this.token_id = token_id;
    this.owner_id = owner_id;
    this.metadata = metadata;
    approved_account_id = approved_account_id;
  }
}