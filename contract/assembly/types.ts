import {
  PersistentMap,
  PersistentUnorderedMap,
  PersistentSet,
} from "near-sdk-as";

export type AccountId = string;
export type TokenId = string;
export type HashMap = Map<string, string> // | anyref;
export type UnorderedSet = PersistentSet<string>;
export type Promise = string; // this should be anyref but for some reason is giving an error;

export interface TokenMetadata {
   title: string; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
   description: string; // free-form description
   media: string; // URL to associated media; preferably to decentralized; content-addressed storage
   media_hash: u64; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
   copies: u64; // number of copies of this set of metadata in existence when token was minted.
   issued_at: string; // ISO 8601 datetime when token was issued or minted
   expires_at: string; // ISO 8601 datetime when token expires
   starts_at: string; // ISO 8601 datetime when token starts being valid
   updated_at: string; // ISO 8601 datetime when token was last updated
   extra: string; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
   reference: string; // URL to an off-chain JSON file with more info.
   reference_hash: u64; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export interface Token {
   owner_id: AccountId;
   approved_account_ids: HashMap;
   next_approval_id: u64;
}

export interface JsonToken {
   token_id: TokenId;
   owner_id: AccountId;
   metadata: TokenMetadata;
   approved_account_ids: HashMap;
}

export interface Storage {
  TokensPerOwner: PersistentMap;
  TokensById: PersistentMap;
  TokenMetadataById: PersistentUnorderedMap;
  OwnerId: AccountId;
  ExtraStorageInBytesPerToken: u64;
  Metadata: NFTMetadata | null; // LazyOption in rust 
}

export interface NFTCore {
  // Change methods
  setGreeting(token_id: string): Token | null;
  nft_transfer(receiver_id: string, token_id: string, approval_id: u64 | null, meme: string | null): void;
  nft_transfer_call(receiver_id: string, token_id: string, approval_id: u64 | null, meme: string | null): Promise;

  // Approval Management methods
  nft_approve( token_id: TokenId, account_id: string, msg: string | null): void;
  nft_revoke(token_id: string, account_id: string): void;
  nft_revoke_all(token_id: string): void;
  nft_mint(token_id: TokenId, metadata: TokenMetadata): void;

  // View methods
  getGreeting(accountId: string): Token | null;
  nft_token(token_id: string): Token | null;
  nft_resolve_transfer(owner_id: string, receiver_id: string, token_id: string, approved_account_ids: string[] | null): boolean;
  nft_metadata(): NEP171Metadata;

  // Approval Management View methods since this methods return data.
  nft_is_approved(token_id: string, approved_account_id: string, approval_id: number | null ): boolean;


  // Enumeration View methods since this methods return data.
  nft_total_supply(): u64;
  nft_tokens(from_index: string | null, limit: number | null): Token[];
  nft_supply_for_owner(account_id: string): string;
  nft_tokens_for_owner(account_id: string, from_index: string|null, limit: number | null): Token[];

  // Receiver/Event methods
  nft_on_transfer(sender_id: string, previous_owner_id: string, token_id: string, msg: string): Promise<boolean>;

  // Approval Management Events methods
  nft_on_approve(token_id: TokenId, owner_id: string, approval_id: number, msg: string): void;
  
  // TODO: create nft_on_revoke event
  nft_on_revoke(): void;

  // Private/Internal methods
  internal_transfer(sender_id: string, receiver_id: string, token_id: TokenId, approval_id: u64 | null, memo: string): Token;
  internal_add_token_to_owner(account_id: AccountId, token_id: TokenId): void;
  internal_remove_token_from_owner(account_id: AccountId, token_id: TokenId): void;

}
