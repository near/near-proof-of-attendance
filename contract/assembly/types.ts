import {
  PersistentMap,
  PersistentUnorderedMap,
  PersistentSet,
  u128, // this i not a type but a class. I cannot use as a type
} from "near-sdk-as";

export type AccountId = string;
export type TokenId = string;
export type HashMap = Map<string, string> // | anyref;
export type UnorderedSet = PersistentSet<string>;
export type StorageUsage = u64;
export type Promise = anyref;
export type Balance = u128; // accourding to nearcore primitives types this should be a u128. Which I cannot find in "near-sdk-as". Gonna use u64 for now.
export type Gas = u64;