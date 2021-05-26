import {
  TokenMetadata,  
} from "./metadata";

import {
  TokenId,
  AccountId,
} from "./types"


@nearBindgen
export class Token {
  owner_id: string;
  approved_account_ids: anyref[];
  next_approval_id: i64;
}

@nearBindgen
export class JsonToken {
  token_id: TokenId;
  owner_id: string;
  metadata: TokenMetadata;
  approved_account_id: Map<AccountId, u64>;
}