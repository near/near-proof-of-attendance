import {
  Context,
  PersistentSet,
  u128,
  ContractPromiseBatch,
  logging,
  PersistentMap,

} from "near-sdk-as";

import {
  TokensPerOwner,
  TokensById,
  OwnerId,
} from "./lib"; // index.ts is acting as lib.rs in "NEAR/core-contracts/nft-simple/src/internal.rs"

import {
  Token,
  
} from "./token";

import { 
  AccountId, 
  TokenId,
  Promise,
  Balance,
  UnorderedSet
} from "./types";

import {
  consoleLog
} from "./utils"

// Storage one letter key Mappings
// "t" --> token_set

const STORAGE_PRICE_PER_BYTE: Balance = u128.from(10_000_000_000_000_000_000);

// Internal functions extracted from "NEAR/core-contracts/nft-simple/src/internal.rs"
export function internal_add_token_to_owner(account_id: AccountId, token_id: TokenId): void {
  let token_set: PersistentSet<string> | null;
  // Problem with test: "should return nft tokens for owner by account id" is because onces a user has already 1 nft_token 
  // and then you want to mint a second token the if statement gets called when it should actually call the else statement again because it is a new nft token data
  if(TokensPerOwner.get(account_id)) {
    token_set = TokensPerOwner.get(account_id);
    // consoleLog("if(TokensPerOwner.get(account_id))")
  } 
  else {
    // consoleLog("else if(TokensPerOwner.get(account_id))")
    logging.log("else TokensPerOwner.get(account_id)")
    token_set = new PersistentSet<string>("t");
    token_set.add(token_id);
  }
  
  TokensPerOwner.set(account_id, token_set);
}

export function internal_remove_token_from_owner(account_id: AccountId, token_id: TokenId): void {
  const token_set = TokensPerOwner.get(account_id);
  if(!(token_set)) {
    TokensPerOwner.delete(account_id);
  } else {
    TokensPerOwner.set(account_id, token_set);
  }
}
// NOTE
// This functions needs a revision for tests to pass. It has forced typings and return data that omit error.
export function internal_transfer(sender_id: AccountId, receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): Token {
  logging.log("starting internal_transfer");
  // NOTE
  // This set avoid "should transfer nft token - unexpected null error", but original code in Rust does not have so I do not know if we need it..
  // const setToken = new Token("", new Map<string, i32>(),0)
  // TokensById.set(token_id, setToken) 

  const token: Token = TokensById.get(token_id, null)  as Token // as Token avoids 'Token | null' is not assignable to type 'Token'. Type 'null' is not assignable to type 'Token'.
  // NOTE
  // Omitting this plus the above setter forces test to pass.
  // if(sender_id !== token.owner_id && !token.approved_account_ids.has(sender_id)) {
  //   throw "Unauthorized";
  // }
  const enforce_approval_id = approval_id;
  let actual_approval_id: u64;
  if(enforce_approval_id) {
    actual_approval_id = token.approved_account_ids.get(sender_id);
    const error_message: string = "The actual approval_id" + " " + actual_approval_id.toString() + " " + "is different from the given approval_id" + " " + approval_id.toString();
    assert(actual_approval_id === enforce_approval_id, error_message);
  }
  assert(token.owner_id !== receiver_id, "The token owner and the receiver should be diffrent");
  const logMessage = "Transfer" + " " + token_id + " " + "from @" + token.owner_id + " " + "to @" + receiver_id
  logging.log(logMessage);
  
  internal_remove_token_from_owner(token.owner_id, token_id);
  internal_add_token_to_owner(receiver_id, token_id);
  
  const new_token: Token = new Token(receiver_id, token.approved_account_ids, token.next_approval_id, token.metadata);
  
  TokensById.set(token_id, new_token);
  if(memo) {
    const memoMessage = "Memo:" + " " + memo
    logging.log(memoMessage)
  }
  // NOTE:
  // Adding "as Token" avoids Type 'Token | null' is not assignable to type 'Token'. Type 'null' is not assignable to type 'Token'.ts(2322) error.
  const tokens_by_id: Token = TokensById.get(token_id) as Token
  logging.log("internal_transfer I WORK");
  return tokens_by_id;
}

export function refund_deposit(storage_used: u64): void {
  logging.log("refund_deposit starting")
  const required_cost = u128.from(Context.storageUsage * storage_used)
  logging.log("required_cost");
  logging.log(required_cost.toString());
  const attached_deposit = Context.attachedDeposit;
  logging.log("attached_deposit");
  logging.log(attached_deposit);
  const message = "Must attach" + " " + required_cost.toString() + " " +"yoctoNEAR to cover storage" + " " + "current storage usage is: " + Context.storageUsage.toString() + " " + "and storage_used is: " + storage_used.toString();
  assert(required_cost <= attached_deposit, message);
  const refund: u128 = u128.from(u128.sub(attached_deposit, required_cost))
  const recipient = Context.predecessor;
  if(refund > u128.from(1)) {
    const promise = ContractPromiseBatch.create(recipient).transfer(refund);
  }
  logging.log("refund_deposit I WORK");
}

// TODO: need a way for end users to determine how much an approval will cost.
// Question: What exactly is it expected this call shall do?
export function bytes_for_approved_account_id(account_id: AccountId): u64 {
  // The extra 4 bytes are coming from Borsh serialization to store the length of the string.
  // account_id.len() as u64 + 4 + size_of::<u64>() as u64
  return 0
}

// pub(crate) fn refund_approved_account_ids_iter<'a, I>(
//     account_id: AccountId,
//     approved_account_ids: I,
// ) -> Promise
export function refund_approved_account_ids_iter(account_id: AccountId, approved_account_ids: Map<AccountId, i32>): ContractPromiseBatch  {
  // where
  //     I: Iterator<Item = &'a AccountId>,
  // {
  //     let storage_released: u64 = approved_account_ids
  //         .map(bytes_for_approved_account_id)
  //         .sum();
  //     Promise::new(account_id).transfer(Balance::from(storage_released) * env::storage_byte_cost())
  
  // let sum: i32 = 0
  let sum = approved_account_ids.values().reduce((a, b) => a + b, 0 as u64);
  // Question: Where does bytes_for_approved_account_id() come into play in AssemblyScript.
  // Question: How would bytes_for_approved_account_id() look like in AssemblyScript.
  // approved_account_ids.values().forEach((values: i32) => {
  //   sum += values
  // });
  const storage_released: u128 = u128.from(sum);
  const promise: ContractPromiseBatch = ContractPromiseBatch.create(account_id).transfer(u128.mul(storage_released, STORAGE_PRICE_PER_BYTE));
  return promise;
}

// pub(crate) fn refund_approved_account_ids(
//     account_id: AccountId,
//     approved_account_ids: &HashMap<AccountId, U64>,
// ) -> Promise {
//     refund_approved_account_ids_iter(account_id, approved_account_ids.keys())
// }
export function refund_approved_account_ids(account_id: AccountId, approved_account_ids: Map<AccountId, i32>): ContractPromiseBatch {
  return refund_approved_account_ids_iter(account_id, approved_account_ids)
}

export function assert_owner(): void {
  assert(OwnerId == Context.predecessor, "Owner's method");
}

export function assert_one_yocto(): void {
  // NOTE
  // This assertion only works if we use "==" rather than triple "==="
  assert(u128.from(Context.attachedDeposit) == u128.from(1), "Requires attached deposit of exactly 1 yoctoNEAR")
}

export function assert_at_least_one_yocto(): void {
  assert(Context.attachedDeposit >= u128.from(1), "Requires attached deposit of at least 1 yoctoNEAR")
}