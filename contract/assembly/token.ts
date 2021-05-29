import {
  TokenMetadata,  
} from "./metadata";

import {
  TokenId,
  AccountId,
} from "./types"


@nearBindgen
export class Token {
  constructor(
    owner_id: string,
    approved_account_ids: Map<AccountId, u64>,
    next_approval_id: i64) {}
}

@nearBindgen
export class JsonToken {
  constructor(
    token_id: TokenId,
    owner_id: string,
    metadata: TokenMetadata,
    approved_account_id: Map<AccountId, u64>
  ) {}
}