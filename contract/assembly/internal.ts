import {
  Context,
  PersistentSet,
  u128,
  ContractPromiseBatch,
  logging,

} from "near-sdk-as";

import {
  TokensPerOwner,
  TokensById,
} from "./index"; // index.ts is acting as lib.rs in "NEAR/core-contracts/nft-simple/src/internal.rs"

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
  if(TokensPerOwner.get(account_id)){
    consoleLog("TokensPerOwner.get(account_id)")
    token_set = TokensPerOwner.get(account_id);
  } 
  else {
    logging.log("else TokensPerOwner.get(account_id)")
    consoleLog("else TokensPerOwner.get(account_id)")
    token_set = new PersistentSet<string>("t");
    token_set.add(token_id);
  }
  TokensPerOwner.set(account_id, token_set);
}

export function internal_remove_token_from_owner(account_id: AccountId, token_id: TokenId): void {
  const token_set = TokensPerOwner.getSome(account_id);
  if(!(token_set)) {
    TokensPerOwner.delete(account_id);
  } else {
    TokensPerOwner.set(account_id, token_set);
  }
}

export function internal_transfer(sender_id: AccountId, receiver_id: AccountId, token_id: TokenId, approval_id: u64, memo: string): Token  {
  const token = TokensById.getSome(token_id);
  if(sender_id !== token.owner_id && !token.approved_account_ids.has(sender_id)) {
    throw "Unauthorized";
  }
  const enforce_approval_id = approval_id;
  let actual_approval_id: u64;
  if(enforce_approval_id) {
    actual_approval_id = token.approved_account_ids.getSome(sender_id);
    const error_message: string = "The actual approval_id" + " " + actual_approval_id + " " + "is different from the given approval_id" + " " + approval_id;
    assert(actual_approval_id === enforce_approval_id, error_message);
  }
  assert(token.owner_id !== receiver_id, "The token owner and the receiver should be diffrent");
  const logMessage = "Transfer" + " " + token_id + " " + "from @" + token.owner_id + " " + "to @" + receiver_id
  logging.log(logMessage);
  
  internal_remove_token_from_owner(token.owner_id, token_id);
  internal_add_token_to_owner(receiver_id, token_id);
  
  const new_token: Token = {
    owner_id: receiver_id,
    approved_account_ids: token.approved_account_ids, // Default::default()
    next_approval_id: token.next_approval_id,
  };
  
  TokensById.set(token_id, new_token);
  if(memo) {
    const memoMessage = "Memo:" + " " + memo
    logging.log(memoMessage)
  }
  return TokensById.getSome(token_id);
}

export function refund_deposit(storage_used: u64): void {
  const required_cost = u128.from(u128.from(Context.storageUsage) * u128.from(storage_used))
  const attached_deposit = Context.attachedDeposit;
  consoleLog("required_cost");
  consoleLog(required_cost.toString())
  consoleLog("attached_deposit");
  consoleLog(attached_deposit.toString());
  assert(required_cost <= attached_deposit, "Must attach" + " " + required_cost.toString() + "yoctoNEAR to cover storage");
  const refund = u128.from(attached_deposit - required_cost)
  const recipient = Context.predecessor;
  if(refund > u128.from(1)) {
    consoleLog("refund > u128.from(1)")
    const promise = ContractPromiseBatch.create(recipient).transfer(refund);
  } else {
    consoleLog("else refund > u128.from(1)")
  }
}

// TODO: need a way for end users to determine how much an approval will cost.
// Question: What exactly is it expected this call shall do?
export function bytes_for_approved_account_id(account_id: AccountId): u64 {
  // The extra 4 bytes are coming from Borsh serialization to store the length of the string.
  // account_id.len() as u64 + 4 + size_of::<u64>() as u64
}

// pub(crate) fn refund_approved_account_ids_iter<'a, I>(
//     account_id: AccountId,
//     approved_account_ids: I,
// ) -> Promise
export function refund_approved_account_ids_iter(account_id: AccountId, approved_account_ids: Map<AccountId, u64>): ContractPromiseBatch  {
  // where
  //     I: Iterator<Item = &'a AccountId>,
  // {
  //     let storage_released: u64 = approved_account_ids
  //         .map(bytes_for_approved_account_id)
  //         .sum();
  //     Promise::new(account_id).transfer(Balance::from(storage_released) * env::storage_byte_cost())
  
  let sum: u64 = 0;
  // Question: Where does bytes_for_approved_account_id() come into play in AssemblyScript.
  // Question: How would bytes_for_approved_account_id() look like in AssemblyScript.
  approved_account_ids.forEach((values) => {
    sum += values
  });
  const storage_released: u64 = sum;
  const promise = ContractPromiseBatch.create(account_id).transfer(u128.from(storage_released) * STORAGE_PRICE_PER_BYTE);
  return promise;
}

// pub(crate) fn refund_approved_account_ids(
//     account_id: AccountId,
//     approved_account_ids: &HashMap<AccountId, U64>,
// ) -> Promise {
//     refund_approved_account_ids_iter(account_id, approved_account_ids.keys())
// }
export function refund_approved_account_ids(account_id: AccountId, approved_account_ids: Map<AccountId, u64>): ContractPromiseBatch {
  return refund_approved_account_ids_iter(account_id, approved_account_ids.keys())
}

export function assert_owner(owner_id: AccountId): void {
  logging.log("owner_id");
  logging.log(owner_id);
  logging.log("Context.predecessor");
  logging.log(Context.predecessor);
  logging.log("Context.sender");
  logging.log(Context.sender);
  consoleLog("INSIDE assert_owner()");
  consoleLog("owner_id");
  consoleLog(owner_id);
  consoleLog("Context.predecessor");
  consoleLog(Context.predecessor);
  consoleLog("Context.sender");
  consoleLog(Context.sender);
  assert(owner_id == Context.predecessor, "Owner's method");
}

export function assert_one_yocto(): void {
  assert(Context.attachedDeposit === 1, "Requires attached deposit of exactly 1 yoctoNEAR")
}

export function assert_at_least_one_yocto(): void {
  assert(Context.attachedDeposit >= 1, "Requires attached deposit of at least 1 yoctoNEAR")
}
